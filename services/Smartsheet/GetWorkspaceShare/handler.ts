import { GetWorkspaceShareInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetWorkspaceShareInputs>) => {
  const { workspaceId, shareId, accessapilevel, outputVariable } = inputs;
  if (!workspaceId) {
    throw new Error('workspaceId is required');
  }
  if (!shareId) {
    throw new Error('shareId is required');
  }
  const path = `/workspaces/${workspaceId}/shares/${shareId}`;
  const queryParams: Record<string, string | number | boolean> = {};
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
