import 'dotenv/config';
import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Google Sheets configuration
// You can set these via environment variables or create a config file
const SPREADSHEET_ID = '1SHdY7_d00WTFxzSUMtUsIv-12vBKQEbytB-nb8jv-gA';
const CREDENTIALS_PATH = join(__dirname, 'credentials.json');
const SHEET_NAME = 'Connector Results Status Program';

let auth = null;
let sheets = null;

// Initialize Google Sheets API
async function initializeSheets() {
  if (sheets) {
    return sheets;
  }

  try {
    // Try to load credentials from file
    let credentials;
    try {
      console.log('Loading credentials from file:', CREDENTIALS_PATH);
      const credentialsContent = readFileSync(CREDENTIALS_PATH, 'utf8');
      credentials = JSON.parse(credentialsContent);
    } catch (error) {
      // If file doesn't exist, try environment variable
      if (process.env.GOOGLE_CREDENTIALS) {
        credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
      } else {
        throw new Error(
          `${process.env.GOOGLE_CREDENTIALS} Google credentials not found. Please set GOOGLE_CREDENTIALS_PATH or GOOGLE_CREDENTIALS environment variable.`
        );
      }
    }

    // Authenticate using service account
    auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    sheets = google.sheets({ version: 'v4', auth: authClient });

    return sheets;
  } catch (error) {
    console.error('Error initializing Google Sheets:', error.message);
    throw error;
  }
}

// Ensure the sheet exists and has headers
async function ensureSheetExists() {
  if (!SPREADSHEET_ID) {
    throw new Error('GOOGLE_SHEET_ID environment variable is not set');
  }

  const sheetsAPI = await initializeSheets();

  try {
    // Get spreadsheet metadata
    const spreadsheet = await sheetsAPI.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    // Check if our sheet exists
    const sheetExists = spreadsheet.data.sheets.some(
      (sheet) => sheet.properties.title === SHEET_NAME
    );

    if (!sheetExists) {
      // Create the sheet
      await sheetsAPI.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: SHEET_NAME,
                },
              },
            },
          ],
        },
      });
    }

    // Set headers
    await sheetsAPI.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:F1`,
      valueInputOption: 'RAW',
      resource: {
        values: [
          [
            'Connector ID',
            'Connector Name',
            'Status',
            'Comment',
            'Last Updated',
            'Tested At',
          ],
        ],
      },
    });

    return true;
  } catch (error) {
    console.error('Error ensuring sheet exists:', error.message);
    throw error;
  }
}

// Sync all connectors to Google Sheet
export async function syncAllConnectors(connectors, statuses = {}) {
  try {
    if (!SPREADSHEET_ID) {
      console.warn('Google Sheets integration not configured. Set GOOGLE_SHEET_ID to enable.');
      return { success: false, error: 'Google Sheets not configured' };
    }
    
    const sheetsAPI = await initializeSheets();
    await ensureSheetExists();

    // Prepare data rows
    const rows = connectors.map((connector) => {
      const status = statuses[connector.id] || {
        status: 'pending',
        comment: '',
        updatedAt: null,
      };

      return [
        connector.id || '',
        connector.name || connector.directory || '',
        status.status || 'pending',
        status.comment || '',
        status.updatedAt || new Date().toISOString(),
        '', // Tested At - will be filled when connector is tested
      ];
    });

    // Clear existing data (except headers)
    await sheetsAPI.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:F1000`,
    });

    // Write all data
    if (rows.length > 0) {
      await sheetsAPI.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A2:F${rows.length + 1}`,
        valueInputOption: 'RAW',
        resource: {
          values: rows,
        },
      });
    }

    return { success: true, message: `Synced ${rows.length} connectors to Google Sheet` };
  } catch (error) {
    console.error('Error syncing connectors to Google Sheet:', error);
    return { success: false, error: error.message };
  }
}

// Update a single connector row in Google Sheet
export async function updateConnectorInSheet(connector, status, testedAt = null) {
  try {
    if (!SPREADSHEET_ID) {
      console.warn('Google Sheets integration not configured. Set GOOGLE_SHEET_ID to enable.');
      return { success: false, error: 'Google Sheets not configured' };
    }
    
    const sheetsAPI = await initializeSheets();
    await ensureSheetExists();

    // First, find the row number for this connector
    const allData = await sheetsAPI.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:A`,
    });

    const rows = allData.data.values || [];
    let rowIndex = -1;

    // Find the row (skip header row, so start from index 1)
    for (let i = 1; i < rows.length; i++) {
      if (rows[i] && rows[i][0] === connector.id) {
        rowIndex = i + 1; // +1 because Sheets API is 1-indexed
        break;
      }
    }

    if (rowIndex === -1) {
      // Connector not found, append new row
      await sheetsAPI.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:F`,
        valueInputOption: 'RAW',
        resource: {
          values: [
            [
              connector.id || '',
              connector.name || connector.directory || '',
              status.status || 'pending',
              status.comment || '',
              status.updatedAt || new Date().toISOString(),
              testedAt || '',
            ],
          ],
        },
      });
    } else {
      // Update existing row
      await sheetsAPI.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A${rowIndex}:F${rowIndex}`,
        valueInputOption: 'RAW',
        resource: {
          values: [
            [
              connector.id || '',
              connector.name || connector.directory || '',
              status.status || 'pending',
              status.comment || '',
              status.updatedAt || new Date().toISOString(),
              testedAt || status.testedAt || '',
            ],
          ],
        },
      });
    }

    return { success: true, message: 'Updated connector in Google Sheet' };
  } catch (error) {
    console.error('Error updating connector in Google Sheet:', error);
    return { success: false, error: error.message };
  }
}

// Log connector test result to Google Sheet
export async function logConnectorTest(connector, inputs, result, error = null) {
  try {
    if (!SPREADSHEET_ID) {
      // Silently skip if not configured
      return { success: false, error: 'Google Sheets not configured' };
    }
    
    const sheetsAPI = await initializeSheets();
    await ensureSheetExists();

    // Create or get a "Test Logs" sheet
    const TEST_LOG_SHEET = 'Test Logs';
    
    try {
      const spreadsheet = await sheetsAPI.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
      });

      const sheetExists = spreadsheet.data.sheets.some(
        (sheet) => sheet.properties.title === TEST_LOG_SHEET
      );

      if (!sheetExists) {
        await sheetsAPI.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEET_ID,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: TEST_LOG_SHEET,
                  },
                },
              },
            ],
          },
        });

        // Set headers for test log
        await sheetsAPI.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${TEST_LOG_SHEET}!A1:F1`,
          valueInputOption: 'RAW',
          resource: {
            values: [
              [
                'Timestamp',
                'Connector ID',
                'Connector Name',
                'Inputs',
                'Result',
                'Error',
              ],
            ],
          },
        });
      }
    } catch (error) {
      console.error('Error creating test log sheet:', error);
    }

    // Append test log
    await sheetsAPI.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${TEST_LOG_SHEET}!A:F`,
      valueInputOption: 'RAW',
      resource: {
        values: [
          [
            new Date().toISOString(),
            connector.id || '',
            connector.name || connector.directory || '',
            JSON.stringify(inputs),
            result ? JSON.stringify(result).substring(0, 500) : '',
            error || '',
          ],
        ],
      },
    });

    return { success: true, message: 'Logged test to Google Sheet' };
  } catch (error) {
    console.error('Error logging test to Google Sheet:', error);
    return { success: false, error: error.message };
  }
}

