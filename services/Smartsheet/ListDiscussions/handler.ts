import { ListDiscussionsInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListDiscussionsInputs>) => {
  const { sheetId, include, page, pageSize, includeAll, outputVariable } =
    inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Listing discussions for sheet ${sheetId}`);

  try {
    const queryParams: Record<string, string | number | boolean> = {};
    if (include) {
      queryParams.include = include;
    }
    if (page !== undefined) {
      queryParams.page = page;
    }
    if (pageSize !== undefined) {
      queryParams.pageSize = pageSize;
    }
    if (includeAll !== undefined) {
      queryParams.includeAll = includeAll;
    }

    const result = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
    }>({
      method: 'GET',
      path: `/sheets/${sheetId}/discussions`,
      queryParams,
    });
    log(`Fetched discussions successfully`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    throw new Error(`Failed to fetch discussions: ${error.message}`);
  }
};
