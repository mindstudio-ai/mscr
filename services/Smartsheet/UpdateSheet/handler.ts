import smartsheet from 'smartsheet';
import { UpdateSheetInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: UpdateSheetInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    sheetId,
    sheetName,
    criticalPathEnabled,
    dependenciesEnabled,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  // Get access token from environment
  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  // Initialize Smartsheet client
  const client = smartsheet.createClient({ accessToken });

  log(`Updating sheet with ID: ${sheetId}`);

  try {
    // Build update object with only provided fields
    const updateBody: any = {};

    if (sheetName) {
      updateBody.name = sheetName;
      log(`Setting new name: ${sheetName}`);
    }

    // Add user settings if provided
    if (criticalPathEnabled !== '' && criticalPathEnabled !== undefined) {
      if (!updateBody.userSettings) {
        updateBody.userSettings = {};
      }
      updateBody.userSettings.criticalPathEnabled =
        criticalPathEnabled === 'true' || criticalPathEnabled === true;
      log(
        `Setting critical path: ${updateBody.userSettings.criticalPathEnabled}`,
      );
    }

    if (dependenciesEnabled !== '' && dependenciesEnabled !== undefined) {
      if (!updateBody.userSettings) {
        updateBody.userSettings = {};
      }
      updateBody.userSettings.dependenciesEnabled =
        dependenciesEnabled === 'true' || dependenciesEnabled === true;
      log(
        `Setting dependencies: ${updateBody.userSettings.dependenciesEnabled}`,
      );
    }

    // Check if there are any updates to make
    if (Object.keys(updateBody).length === 0) {
      throw new Error('No update properties provided');
    }

    // Update sheet
    const response = await client.sheets.updateSheet({
      sheetId,
      body: updateBody,
    });

    log('Successfully updated sheet');

    // Set output variable
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (error.statusCode === 404) {
      throw new Error(
        `Sheet not found: ${sheetId}. Please check the ID and your access permissions.`,
      );
    } else if (error.statusCode === 403) {
      throw new Error(
        `Permission denied. You must be an owner or admin to update this sheet.`,
      );
    } else if (error.statusCode === 400) {
      throw new Error(`Invalid update parameters: ${errorMessage}`);
    } else {
      throw new Error(`Failed to update sheet: ${errorMessage}`);
    }
  }
};
