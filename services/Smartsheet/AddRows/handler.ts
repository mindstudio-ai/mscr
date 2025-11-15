import smartsheet from 'smartsheet';
import { AddRowsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: AddRowsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, rowsData, positionType, siblingId, outputVariable } = inputs;

  // Validate required inputs
  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  if (!rowsData) {
    throw new Error('Rows data is required');
  }

  // Get access token from environment
  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  // Initialize Smartsheet client
  const client = smartsheet.createClient({ accessToken });

  log(`Adding rows to sheet: ${sheetId}`);

  try {
    // Parse rows data
    let rowsArray =
      typeof rowsData === 'string' ? JSON.parse(rowsData) : rowsData;

    if (!Array.isArray(rowsArray)) {
      // If single row object provided, wrap in array
      rowsArray = [rowsArray];
    }

    // Apply default position if not specified per row
    if (positionType && positionType !== 'toBottom') {
      rowsArray = rowsArray.map((row: any) => {
        if (!row.toTop && !row.toBottom && !row.parentId && !row.siblingId) {
          const positionedRow = { ...row };

          if (positionType === 'toTop') {
            positionedRow.toTop = true;
          } else if (positionType === 'toBottom') {
            positionedRow.toBottom = true;
          } else if (positionType === 'above' && siblingId) {
            positionedRow.siblingId = siblingId;
            positionedRow.above = true;
          } else if (positionType === 'below' && siblingId) {
            positionedRow.siblingId = siblingId;
          }

          return positionedRow;
        }
        return row;
      });
    } else {
      // Default to bottom if no position specified
      rowsArray = rowsArray.map((row: any) => {
        if (!row.toTop && !row.toBottom && !row.parentId && !row.siblingId) {
          return { ...row, toBottom: true };
        }
        return row;
      });
    }

    log(`Adding ${rowsArray.length} row(s)`);

    // Add rows to sheet
    const response = await client.sheets.addRows({
      sheetId,
      body: rowsArray,
    });

    log(`Successfully added ${response.result.length} row(s)`);

    // Set output variable
    setOutput(outputVariable, {
      addedRows: response.result,
      count: response.result.length,
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (error.statusCode === 404) {
      throw new Error(
        `Sheet not found: ${sheetId}. Please check the ID and your access permissions.`,
      );
    } else if (error.statusCode === 403) {
      throw new Error(
        `Permission denied. You must have editor access to add rows to this sheet.`,
      );
    } else if (error.statusCode === 400) {
      throw new Error(
        `Invalid row data: ${errorMessage}. Check your column IDs and values.`,
      );
    } else {
      throw new Error(`Failed to add rows: ${errorMessage}`);
    }
  }
};
