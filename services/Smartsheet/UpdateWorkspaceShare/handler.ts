import { UpdateWorkspaceShareInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<UpdateWorkspaceShareInputs>) => {
  const { workspaceId, shareId, accessapilevel, accesslevel, outputVariable } =
    inputs;
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
  const body: Record<string, any> = {};
  if (accesslevel !== undefined) {
    body['accessLevel'] = accesslevel;
  }

  const requestOptions: Record<string, any> = {
    method: 'PUT',
    path,
  };
  if (Object.keys(queryParams).length > 0) {
    requestOptions.queryParams = queryParams;
  }
  if (Object.keys(body).length > 0) {
    requestOptions.body = body;
  }

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
