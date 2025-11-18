import { DeleteWorkspaceShareInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<DeleteWorkspaceShareInputs>) => {
  const { workspaceId, shareId, outputVariable } = inputs;
  if (!workspaceId) {
    throw new Error('workspaceId is required');
  }
  if (!shareId) {
    throw new Error('shareId is required');
  }
  const path = `/workspaces/${workspaceId}/shares/${shareId}`;

  const requestOptions: Record<string, any> = {
    method: 'DELETE',
    path,
  };

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
