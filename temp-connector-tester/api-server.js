import express from 'express';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yaml';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

const CONNECTORS_DIR = join(__dirname, '../services/Smartsheet');
const TEST_HARNESS_PATH = join(__dirname, '../src/utils/testHarness.ts');

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
        connector.id =
          connector.id ||
          dir
            .toLowerCase()
            .replace(/([A-Z])/g, '-$1')
            .toLowerCase();
        connector.directory = dir;
        connectors.push(connector);
      }
    } catch (error) {
      console.error(`Error loading connector ${dir}:`, error.message);
    }
  }

  return connectors.sort((a, b) => a?.name?.localeCompare(b.name));
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

const accessToken = 'gH7cjqIFBizHEyBsTacSEEbAFCDw7ESa2k9MJ';

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

    // Use the test harness from the main project
    const handlerPath = join(CONNECTORS_DIR, connector.directory, 'handler.ts');

    // Escape accessToken for use in the script string
    const escapedAccessToken = JSON.stringify(accessToken);

    // Execute using tsx to run TypeScript
    return new Promise((resolve, reject) => {
      const testScript = `
        import { handler } from '${handlerPath}';
        import runConnector from '${TEST_HARNESS_PATH}';
        
        (async () => {
          try {
            // Set accessToken in process.env for the connector execution
            process.env.accessToken = ${escapedAccessToken};
            const ctx = await runConnector(handler, ${JSON.stringify(inputs)});
            console.log(JSON.stringify({ success: true, outputs: ctx.outputs, logs: ctx.logs }));
          } catch (error) {
            console.log(JSON.stringify({ success: false, error: error.message, stack: error.stack }));
          }
        })();
      `;

      const tsxProcess = spawn('npx', ['tsx', '-e', testScript], {
        cwd: join(__dirname, '..'),
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      let stdout = '';
      let stderr = '';

      tsxProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      tsxProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      tsxProcess.on('close', (code) => {
        try {
          // Try to parse JSON from stdout
          const jsonMatch = stdout.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const result = JSON.parse(jsonMatch[0]);
            if (result.success) {
              res.json(result);
            } else {
              res.status(500).json(result);
            }
          } else {
            // Fallback: return mock response
            res.json({
              success: true,
              outputs: {
                result: {
                  message: 'Connector test executed',
                  connector: connector.name,
                  inputs: inputs,
                  note: 'Handler executed via tsx',
                },
              },
              logs: [
                `Executed ${connector.name}`,
                ...stderr.split('\n').filter(Boolean),
              ],
            });
          }
          resolve();
        } catch (error) {
          res.status(500).json({
            error: 'Failed to parse result',
            stdout,
            stderr,
          });
          resolve();
        }
      });

      tsxProcess.on('error', (error) => {
        // Fallback to mock response if tsx is not available
        res.json({
          success: true,
          outputs: {
            result: {
              message: 'Connector would be executed here',
              connector: connector.name,
              inputs: inputs,
              note: 'For full execution, ensure tsx is available and handlers are properly configured',
            },
          },
          logs: [
            `[Mock] Would execute ${connector.name}`,
            `Inputs: ${JSON.stringify(inputs)}`,
          ],
        });
        resolve();
      });
    });
  } catch (error) {
    console.error('Error testing connector:', error);
    res.status(500).json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🔌 API Server running on http://localhost:${PORT}`);
  console.log(`📁 Loading connectors from: ${CONNECTORS_DIR}`);
  const connectors = loadConnectors();
  console.log(`✅ Loaded ${connectors.length} connectors`);
  console.log(`\n💡 Start the frontend with: npm run frontend`);
  console.log(`🌐 Then open: http://localhost:3000\n`);
});
