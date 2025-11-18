import { GetSheetInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetSheetInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    sheetId,
    accessApiLevel,
    include,
    exclude,
    columnIds,
    filterId,
    ifVersionAfter,
    level,
    pageSize,
    page,
    paperSize,
    rowIds,
    rowNumbers,
    rowsModifiedSince,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Retrieving sheet with ID: ${sheetId}`);

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
    if (columnIds) {
      queryParams.columnIds = columnIds;
    }
    if (filterId) {
      queryParams.filterId = filterId;
    }
    if (ifVersionAfter !== undefined) {
      queryParams.ifVersionAfter = ifVersionAfter;
    }
    if (level !== undefined) {
      queryParams.level = level;
    }
    if (pageSize !== undefined) {
      queryParams.pageSize = pageSize;
    }
    if (page !== undefined) {
      queryParams.page = page;
    }
    if (paperSize) {
      queryParams.paperSize = paperSize;
    }
    if (rowIds) {
      queryParams.rowIds = rowIds;
    }
    if (rowNumbers) {
      queryParams.rowNumbers = rowNumbers;
    }
    if (rowsModifiedSince) {
      queryParams.rowsModifiedSince = rowsModifiedSince;
    }

    // Get sheet
    const response = await smartsheetApiRequest({
      method: 'GET',
      path: `/sheets/${sheetId}`,
      queryParams,
    });

    log(`Successfully retrieved sheet: ${(response as any).name}`);
    log(
      `Sheet contains ${(response as any).rows?.length || 0} rows and ${(response as any).columns?.length || 0} columns`,
    );

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
      errorMessage.includes('Access denied')
    ) {
      throw new Error(
        `Access denied to sheet: ${sheetId}. You may not have permission to view this sheet.`,
      );
    } else {
      throw new Error(`Failed to get sheet: ${errorMessage}`);
    }
  }
};
