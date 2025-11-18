import { ListWorkspaceSharesInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListWorkspaceSharesInputs>) => {
  const {
    workspaceId,
    page,
    pagesize,
    includeall,
    accessapilevel,
    outputVariable,
  } = inputs;
  if (!workspaceId) {
    throw new Error('workspaceId is required');
  }
  const path = `/workspaces/${workspaceId}/shares`;
  const queryParams: Record<string, string | number | boolean> = {};
  if (page !== undefined && page !== null) {
    queryParams['page'] = page;
  }
  if (pagesize !== undefined && pagesize !== null) {
    queryParams['pageSize'] = pagesize;
  }
  if (includeall !== undefined && includeall !== null) {
    queryParams['includeAll'] = includeall;
  }
  if (accessapilevel !== undefined && accessapilevel !== null) {
    queryParams['accessApiLevel'] = accessapilevel;
  }

  const requestOptions: Record<string, any> = {
    method: 'GET',
    path,
  };
  if (Object.keys(queryParams).length > 0) {
    requestOptions.queryParams = queryParams;
  }

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
