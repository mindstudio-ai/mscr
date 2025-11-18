import { ListGroupsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListGroupsInputs>) => {
  const {
    includeAll,
    modifiedSince,
    numericDates,
    page,
    pageSize,
    outputVariable,
  } = inputs;

  log('Listing all groups');

  try {
    const queryParams: Record<string, string | number | boolean> = {};
    if (includeAll !== undefined) {
      queryParams.includeAll = includeAll;
    }
    if (modifiedSince) {
      queryParams.modifiedSince = modifiedSince;
    }
    if (numericDates !== undefined) {
      queryParams.numericDates = numericDates;
    }
    if (page !== undefined) {
      queryParams.page = page;
    }
    if (pageSize !== undefined) {
      queryParams.pageSize = pageSize;
    }

    const response = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
    }>({
      method: 'GET',
      path: '/groups',
      queryParams,
    });
    const data = (response as any).data || response;
    const totalCount =
      (response as any).totalCount || (Array.isArray(data) ? data.length : 0);
    log(`Found ${totalCount} group(s)`);
    setOutput(outputVariable, {
      totalCount,
      groups: data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list groups: ${error.message}`);
  }
};
