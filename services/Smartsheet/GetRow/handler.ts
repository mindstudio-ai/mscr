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
  const {
    sheetId,
    rowId,
    includeDiscussions,
    includeAttachments,
    includeColumns,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  if (!rowId) {
    throw new Error('Row ID is required');
  }

  // Get access token from environment
  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  // Initialize Smartsheet client
  const client = smartsheet.createClient({ accessToken });

  log(`Retrieving row ${rowId} from sheet ${sheetId}`);

  try {
    // Build include parameter
    const includeParams: string[] = [];

    if (includeDiscussions) {
      includeParams.push('discussions');
    }
    if (includeAttachments) {
      includeParams.push('attachments');
    }
    if (includeColumns) {
      includeParams.push('columns');
    }

    // Prepare options
    const options: any = {
      sheetId,
      rowId,
    };

    if (includeParams.length > 0) {
      options.queryParameters = {
        include: includeParams.join(','),
      };
    }

    // Get row
    const response = await client.sheets.getRow(options);

    log(`Successfully retrieved row ${rowId}`);
    log(`Row contains ${response.cells?.length || 0} cells`);

    // Set output variable
    setOutput(outputVariable, response);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (error.statusCode === 404) {
      throw new Error(
        `Sheet or row not found. Please check the sheet ID (${sheetId}) and row ID (${rowId}).`,
      );
    } else if (error.statusCode === 403) {
      throw new Error(
        `Access denied to sheet or row. You may not have permission to view this content.`,
      );
    } else {
      throw new Error(`Failed to get row: ${errorMessage}`);
    }
  }
};
