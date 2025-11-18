import { ListFavoritesInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListFavoritesInputs>) => {
  const { includeAll, page, pageSize, include, outputVariable } = inputs;

  log('Listing favorites');

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

    const response = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
    }>({
      method: 'GET',
      path: '/favorites',
      queryParams,
    });
    const data = (response as any).data || response;
    const totalCount =
      (response as any).totalCount || (Array.isArray(data) ? data.length : 0);
    log(`Found ${totalCount} favorite(s)`);
    setOutput(outputVariable, {
      totalCount,
      favorites: data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list favorites: ${error.message}`);
  }
};
