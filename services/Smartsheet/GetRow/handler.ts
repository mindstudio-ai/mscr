import { GetRowInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetRowInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    sheetId,
    rowId,
    accessApiLevel,
    include,
    exclude,
    level,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  if (!rowId) {
    throw new Error('Row ID is required');
  }

  log(`Retrieving row ${rowId} from sheet ${sheetId}`);

  try {
    // Build query parameters
    const queryParams: Record<string, string | number> = {};
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }
    if (include) {
      queryParams.include = include;
    }
    if (exclude) {
      queryParams.exclude = exclude;
    }
    if (level !== undefined) {
      queryParams.level = level;
    }

    // Get row
    const response = await smartsheetApiRequest({
      method: 'GET',
      path: `/sheets/${sheetId}/rows/${rowId}`,
      queryParams,
    });

    log(`Successfully retrieved row ${rowId}`);
    log(`Row contains ${(response as any).cells?.length || 0} cells`);

    // Set output variable
    setOutput(outputVariable, response);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
      throw new Error(
        `Sheet or row not found. Please check the sheet ID (${sheetId}) and row ID (${rowId}).`,
      );
    } else if (
      errorMessage.includes('403') ||
      errorMessage.includes('Access denied')
    ) {
      throw new Error(
        `Access denied to sheet or row. You may not have permission to view this content.`,
      );
    } else {
      throw new Error(`Failed to get row: ${errorMessage}`);
    }
  }
};
