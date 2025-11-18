import { GetSheetSummaryInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetSheetSummaryInputs>) => {
  const { sheetId, include, exclude, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Getting sheet summary for sheet ${sheetId}`);

  try {
    const queryParams: Record<string, string> = {};
    if (include) {
      queryParams.include = include;
    }
    if (exclude) {
      queryParams.exclude = exclude;
    }

    const result = await smartsheetApiRequest({
      method: 'GET',
      path: `/sheets/${sheetId}/summary`,
      queryParams,
    });

    log('Retrieved sheet summary successfully');
    setOutput(outputVariable, result);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';
    if (errorMessage.includes('403') || errorMessage.includes('Permission')) {
      throw new Error(
        'Permission denied. You may not have access to this sheet.',
      );
    } else {
      throw new Error(`Failed to get sheet summary: ${errorMessage}`);
    }
  }
};
