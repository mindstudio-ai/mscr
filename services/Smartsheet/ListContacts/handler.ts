import { ListContactsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListContactsInputs>) => {
  const {
    includeAll,
    modifiedSince,
    numericDates,
    page,
    pageSize,
    outputVariable,
  } = inputs;

  log('Listing all contacts');

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
      path: '/contacts',
      queryParams,
    });
    const data = (response as any).data || response;
    const totalCount =
      (response as any).totalCount || (Array.isArray(data) ? data.length : 0);
    log(`Found ${totalCount} contact(s)`);
    setOutput(outputVariable, {
      totalCount,
      contacts: data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list contacts: ${error.message}`);
  }
};
