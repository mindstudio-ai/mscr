import { ListColumnsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListColumnsInputs>) => {
  const { sheetId, level, page, pageSize, includeAll, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Listing columns for sheet: ${sheetId}`);

  try {
    const queryParams: Record<string, string | number | boolean> = {};
    if (level !== undefined) {
      queryParams.level = level;
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

    const response = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
    }>({
      method: 'GET',
      path: `/sheets/${sheetId}/columns`,
      queryParams,
    });
    const data = (response as any).data || response;
    const totalCount =
      (response as any).totalCount || (Array.isArray(data) ? data.length : 0);
    log(`Found ${Array.isArray(data) ? data.length : 0} column(s)`);
    setOutput(outputVariable, {
      totalCount,
      columns: data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list columns: ${error.message}`);
  }
};
