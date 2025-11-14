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
  const { sheetName, columns, folderId, workspaceId, outputVariable } = inputs;

  // Validate required inputs
  if (!sheetName) {
    throw new Error('Sheet name is required');
  }

  if (!columns) {
    throw new Error('Columns definition is required');
  }

  // Get access token from environment
  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  // Initialize Smartsheet client
  const client = smartsheet.createClient({ accessToken });

  log(`Creating new sheet: ${sheetName}`);

  try {
    // Parse columns
    const columnArray =
      typeof columns === 'string' ? JSON.parse(columns) : columns;

    if (!Array.isArray(columnArray) || columnArray.length === 0) {
      throw new Error('Columns must be a non-empty array');
    }

    // Prepare sheet object
    const sheetSpec: any = {
      name: sheetName,
      columns: columnArray,
    };

    let response;

    // Create sheet in appropriate location
    if (workspaceId) {
      log(`Creating sheet in workspace: ${workspaceId}`);
      response = await client.sheets.createSheetInWorkspace({
        workspaceId,
        body: sheetSpec,
      });
    } else if (folderId) {
      log(`Creating sheet in folder: ${folderId}`);
      response = await client.sheets.createSheetInFolder({
        folderId,
        body: sheetSpec,
      });
    } else {
      log('Creating sheet in home');
      response = await client.sheets.createSheet({
        body: sheetSpec,
      });
    }

    log(`Successfully created sheet with ID: ${response.result.id}`);

    // Set output variable
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (error.statusCode === 400) {
      throw new Error(
        `Invalid sheet configuration: ${errorMessage}. Check your columns definition.`,
      );
    } else if (error.statusCode === 404) {
      throw new Error(
        `Location not found (folder or workspace). Please check the ID.`,
      );
    } else if (error.statusCode === 403) {
      throw new Error(
        `Permission denied. You may not have permission to create sheets in this location.`,
      );
    } else {
      throw new Error(`Failed to create sheet: ${errorMessage}`);
    }
  }
};
