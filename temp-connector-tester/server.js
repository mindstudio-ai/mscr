import express from 'express';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yaml';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

const CONNECTORS_DIR = join(__dirname, '../services/Smartsheet');

// Load all connectors
function loadConnectors() {
  const connectors = [];
  const dirs = readdirSync(CONNECTORS_DIR).filter((item) => {
    const itemPath = join(CONNECTORS_DIR, item);
    return statSync(itemPath).isDirectory() && item !== 'icon.png';
  });

  for (const dir of dirs) {
    try {
      const ymlPath = join(CONNECTORS_DIR, dir, 'connector.yml');
      if (statSync(ymlPath).isFile()) {
        const ymlContent = readFileSync(ymlPath, 'utf8');
        const connector = YAML.parse(ymlContent);
        connector.id = connector.id || dir.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase();
        connector.directory = dir;
        connectors.push(connector);
      }
    } catch (error) {
      console.error(`Error loading connector ${dir}:`, error.message);
    }
  }

  return connectors.sort((a, b) => a.name.localeCompare(b.name));
}

// API endpoint to get all connectors
app.get('/api/connectors', (req, res) => {
  try {
    const connectors = loadConnectors();
    res.json(connectors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to test a connector
app.post('/api/test-connector', async (req, res) => {
  try {
    const { connectorId, inputs } = req.body;

    // Find the connector
    const connectors = loadConnectors();
    const connector = connectors.find((c) => c.id === connectorId);

    if (!connector) {
      return res.status(404).json({ error: 'Connector not found' });
    }

    // Import and execute the handler dynamically
    const handlerPath = join(CONNECTORS_DIR, connector.directory, 'handler.ts');
    
    // Use dynamic import to load the handler
    // Note: This requires tsx or ts-node to be available
    const handlerModule = await import(handlerPath + '?tsx');
    const { handler } = handlerModule;

    if (!handler) {
      throw new Error('Handler not found in module');
    }

    // Execute the handler
    const outputs = {};
    const logs = [];

    await handler({
      inputs,
      setOutput: (variable, value) => {
        outputs[variable] = value;
        logs.push(`Output set: ${variable}`);
      },
      log: (message) => {
        logs.push(message);
        console.log(`[${connector.name}]`, message);
      },
      uploadFile: async (data, mimeType) => {
        const url = `mock://uploaded-file-${Date.now()}.${mimeType.split('/')[1] || 'bin'}`;
        logs.push(`File uploaded: ${url}`);
        return url;
      },
    });

    res.json({
      success: true,
      outputs,
      logs,
    });
  } catch (error) {
    console.error('Error testing connector:', error);
    res.status(500).json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
});

// Start server
async function startServer() {
  // Create Vite server for frontend
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
    root: __dirname,
  });

  app.use(vite.middlewares);

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Connector Tester running at http://localhost:${PORT}`);
    console.log(`📁 Loading connectors from: ${CONNECTORS_DIR}`);
  });
}

startServer().catch(console.error);
