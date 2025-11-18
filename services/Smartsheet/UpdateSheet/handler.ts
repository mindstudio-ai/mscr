import { UpdateSheetInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<UpdateSheetInputs>) => {
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

    // Build query parameters
    const queryParams: Record<string, number> = {};
    if (inputs.accessApiLevel !== undefined) {
      queryParams.accessApiLevel = inputs.accessApiLevel;
    }

    // Update sheet
    const response = await smartsheetApiRequest({
      method: 'PUT',
      path: `/sheets/${sheetId}`,
      queryParams,
      body: updateBody,
    });

    log('Successfully updated sheet');

    // Set output variable
    setOutput(outputVariable, response);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
      throw new Error(
        `Sheet not found: ${sheetId}. Please check the ID and your access permissions.`,
      );
    } else if (
      errorMessage.includes('403') ||
      errorMessage.includes('Permission')
    ) {
      throw new Error(
        `Permission denied. You must be an owner or admin to update this sheet.`,
      );
    } else if (
      errorMessage.includes('400') ||
      errorMessage.includes('Invalid')
    ) {
      throw new Error(`Invalid update parameters: ${errorMessage}`);
    } else {
      throw new Error(`Failed to update sheet: ${errorMessage}`);
    }
  }
};
