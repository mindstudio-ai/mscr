import { GetSheetSummaryFieldInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetSheetSummaryFieldInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    sheetId,
    fieldId,
    includeAll,
    page,
    pageSize,
    include,
    exclude,
    outputVariable,
  } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!fieldId) {
    throw new Error('Field ID is required');
  }

  log(`Getting summary field ${fieldId}`);

  try {
    const queryParams: Record<string, string | number | boolean> = {};
    if (includeAll !== undefined) {
      queryParams.includeAll = includeAll;
    }
    if (page !== undefined) {
      queryParams.page = page;
    }
    if (pageSize !== undefined) {
      queryParams.pageSize = pageSize;
    }
    if (include) {
      queryParams.include = include;
    }
    if (exclude) {
      queryParams.exclude = exclude;
    }

    const response = await smartsheetApiRequest({
      method: 'GET',
      path: `/sheets/${sheetId}/summaryfields/${fieldId}`,
      queryParams,
    });
    log('Retrieved field successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get sheet summary field: ${error.message}`);
  }
};
