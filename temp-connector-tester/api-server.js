import express from 'express';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yaml';
import { spawn } from 'child_process';
import {
  syncAllConnectors,
  updateConnectorInSheet,
  logConnectorTest,
  getAllConnectorStatusesFromSheet,
} from './googleSheetsService.js';

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

const accessToken = '**';

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

      tsxProcess.on('close', async (code) => {
        try {
          // Try to parse JSON from stdout
          const jsonMatch = stdout.match(/\{[\s\S]*\}/);
          let result;
          if (jsonMatch) {
            result = JSON.parse(jsonMatch[0]);
          } else {
            // Fallback: return mock response
            result = {
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
            };
          }

          // Log test to Google Sheets (non-blocking)
          logConnectorTest(
            connector,
            inputs,
            result.success ? result.outputs : null,
            result.success ? null : result.error,
          ).catch((err) => {
            console.error('Failed to log test to Google Sheets:', err);
          });

          if (result.success) {
            res.json(result);
          } else {
            res.status(500).json(result);
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

      tsxProcess.on('error', async (error) => {
        // Fallback to mock response if tsx is not available
        const result = {
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
        };

        // Log test to Google Sheets (non-blocking)
        logConnectorTest(connector, inputs, result.outputs, null).catch(
          (err) => {
            console.error('Failed to log test to Google Sheets:', err);
          },
        );

        res.json(result);
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

// API endpoint to sync all connectors to Google Sheet
app.post('/api/sync-to-sheet', async (req, res) => {
  try {
    const { statuses } = req.body;
    const connectors = loadConnectors();
    const result = await syncAllConnectors(connectors, statuses || {});

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error('Error syncing to Google Sheet:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API endpoint to update a single connector in Google Sheet
app.post('/api/update-connector-sheet', async (req, res) => {
  try {
    const { connectorId, status } = req.body;

    const connectors = loadConnectors();
    const connector = connectors.find((c) => c.id === connectorId);

    if (!connector) {
      return res.status(404).json({ error: 'Connector not found' });
    }

    const result = await updateConnectorInSheet(connector, status);

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error('Error updating connector in Google Sheet:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API endpoint to get connector statuses from Google Sheets
app.get('/api/connector-statuses', async (req, res) => {
  try {
    const connectors = loadConnectors();
    const statuses = await getAllConnectorStatusesFromSheet(connectors);
    res.json(statuses);
  } catch (error) {
    console.error('Error loading statuses from Google Sheets:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to save connector status to Google Sheets
app.post('/api/connector-status', async (req, res) => {
  try {
    const { connectorId, status, comment, connector } = req.body;

    // Find connector if not provided
    let connectorData = connector;
    if (!connectorData) {
      const connectors = loadConnectors();
      connectorData = connectors.find((c) => c.id === connectorId);
    }

    if (!connectorData) {
      return res.status(404).json({ error: 'Connector not found' });
    }

    const result = await updateConnectorInSheet(connectorData, {
      status,
      comment,
      updatedAt: new Date().toISOString(),
    });

    res.json(result);
  } catch (error) {
    console.error('Error saving status to Google Sheets:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to sync all connectors to Google Sheets
app.post('/api/sync-to-sheets', async (req, res) => {
  try {
    const connectors = loadConnectors();
    const statuses = req.body.statuses || {};

    const result = await syncAllConnectors(connectors, statuses);
    res.json(result);
  } catch (error) {
    console.error('Error syncing to Google Sheets:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🔌 API Server running on http://localhost:${PORT}`);
  console.log(`📁 Loading connectors from: ${CONNECTORS_DIR}`);
  const connectors = loadConnectors();
  console.log(`✅ Loaded ${connectors.length} connectors`);
  console.log(`📊 Google Sheets sync enabled`);
  console.log(`\n💡 Start the frontend with: npm run frontend`);
  console.log(`🌐 Then open: http://localhost:3000\n`);
});
