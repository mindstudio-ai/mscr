import { ListWebhooksInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListWebhooksInputs>) => {
  const { includeAll, page, pageSize, outputVariable } = inputs;

  try {
    log('Listing webhooks...');

    const queryParams: Record<string, boolean | number> = {};
    if (includeAll !== undefined) {
      queryParams.includeAll = includeAll;
    }
    if (page !== undefined) {
      queryParams.page = page;
    }
    if (pageSize !== undefined) {
      queryParams.pageSize = pageSize;
    }

    const result = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
    }>({
      method: 'GET',
      path: '/webhooks',
      queryParams,
    });

    const totalCount =
      (result as any).totalCount || (result as any).data?.length || 0;
    log(`Successfully retrieved ${totalCount} webhooks`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error listing webhooks: ${error.message}`);
    throw error;
  }
};
