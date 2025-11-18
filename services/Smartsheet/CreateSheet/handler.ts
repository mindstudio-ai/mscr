import { CreateSheetInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<CreateSheetInputs>) => {
  const {
    sheetName,
    columns,
    folderId,
    workspaceId,
    include,
    accessApiLevel,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!sheetName) {
    throw new Error('Sheet name is required');
  }

  if (!columns) {
    throw new Error('Columns definition is required');
  }

  log(`Creating new sheet: ${sheetName}`);

  try {
    // Build query parameters
    const queryParams: Record<string, string | number> = {};
    if (include) {
      queryParams.include = include;
    }
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }

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

    let path: string;

    // Create sheet in appropriate location
    if (workspaceId) {
      log(`Creating sheet in workspace: ${workspaceId}`);
      path = `/workspaces/${workspaceId}/sheets`;
    } else if (folderId) {
      log(`Creating sheet in folder: ${folderId}`);
      path = `/folders/${folderId}/sheets`;
    } else {
      log('Creating sheet in home');
      path = '/sheets';
    }

    const response = await smartsheetApiRequest({
      method: 'POST',
      path,
      queryParams,
      body: sheetSpec,
    });

    log(`Successfully created sheet with ID: ${(response as any).id}`);

    // Set output variable
    setOutput(outputVariable, response);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (errorMessage.includes('400') || errorMessage.includes('Invalid')) {
      throw new Error(
        `Invalid sheet configuration: ${errorMessage}. Check your columns definition.`,
      );
    } else if (
      errorMessage.includes('404') ||
      errorMessage.includes('Not Found')
    ) {
      throw new Error(
        `Location not found (folder or workspace). Please check the ID.`,
      );
    } else if (
      errorMessage.includes('403') ||
      errorMessage.includes('Permission')
    ) {
      throw new Error(
        `Permission denied. You may not have permission to create sheets in this location.`,
      );
    } else {
      throw new Error(`Failed to create sheet: ${errorMessage}`);
    }
  }
};
