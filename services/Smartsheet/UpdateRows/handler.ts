import smartsheet from 'smartsheet';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, rowsData, outputVariable } = inputs;

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

  log(`Updating rows in sheet: ${sheetId}`);

  try {
    // Parse rows data
    let rowsArray =
      typeof rowsData === 'string' ? JSON.parse(rowsData) : rowsData;

    if (!Array.isArray(rowsArray)) {
      // If single row object provided, wrap in array
      rowsArray = [rowsArray];
    }

    // Validate that each row has an id
    for (const row of rowsArray) {
      if (!row.id) {
        throw new Error('Each row must have an "id" property');
      }
    }

    log(`Updating ${rowsArray.length} row(s)`);

    // Update rows in sheet
    const response = await client.sheets.updateRow({
      sheetId,
      body: rowsArray,
    });

    log(`Successfully updated ${response.result.length} row(s)`);

    // Set output variable
    setOutput(outputVariable, {
      updatedRows: response.result,
      count: response.result.length,
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (error.statusCode === 404) {
      throw new Error(
        `Sheet or row not found. Please check the sheet ID and row IDs.`,
      );
    } else if (error.statusCode === 403) {
      throw new Error(
        `Permission denied. You must have editor access to update rows in this sheet.`,
      );
    } else if (error.statusCode === 400) {
      throw new Error(
        `Invalid row data: ${errorMessage}. Check your row IDs, column IDs, and values.`,
      );
    } else {
      throw new Error(`Failed to update rows: ${errorMessage}`);
    }
  }
};
