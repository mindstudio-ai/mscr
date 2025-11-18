import { ListWorkspacesInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListWorkspacesInputs>) => {
  const {
    includeAll,
    lastKey,
    page,
    pageSize,
    accessApiLevel,
    outputVariable,
  } = inputs;

  try {
    log('Listing workspaces...');

    const queryParams: Record<string, boolean | string | number> = {};
    if (includeAll !== undefined) {
      queryParams.includeAll = includeAll;
    }
    if (lastKey) {
      queryParams.lastKey = lastKey;
    }
    if (page !== undefined) {
      queryParams.page = page;
    }
    if (pageSize !== undefined) {
      queryParams.pageSize = pageSize;
    }
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }

    const result = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
    }>({
      method: 'GET',
      path: '/workspaces',
      queryParams,
    });

    const totalCount =
      (result as any).totalCount || (result as any).data?.length || 0;
    log(`Successfully retrieved ${totalCount} workspaces`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error listing workspaces: ${error.message}`);
    throw error;
  }
};
