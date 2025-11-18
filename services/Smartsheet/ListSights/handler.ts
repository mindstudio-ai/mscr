import { ListSightsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListSightsInputs>) => {
  const {
    accessApiLevel,
    includeAll,
    modifiedSince,
    numericDates,
    page,
    pageSize,
    outputVariable,
  } = inputs;

  log('Listing all dashboards (sights)');

  try {
    const queryParams: Record<string, string | number | boolean> = {};
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }
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
      path: '/sights',
      queryParams,
    });
    const data = (response as any).data || response;
    const totalCount =
      (response as any).totalCount || (Array.isArray(data) ? data.length : 0);
    log(`Found ${totalCount} dashboard(s)`);
    setOutput(outputVariable, {
      totalCount,
      sights: data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list dashboards: ${error.message}`);
  }
};
