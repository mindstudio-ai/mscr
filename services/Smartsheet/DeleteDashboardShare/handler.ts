import { DeleteDashboardShareInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<DeleteDashboardShareInputs>) => {
  const { sightId, shareId, outputVariable } = inputs;
  if (!sightId) {
    throw new Error('sightId is required');
  }
  if (!shareId) {
    throw new Error('shareId is required');
  }
  const path = `/sights/${sightId}/shares/${shareId}`;

  const requestOptions: Record<string, any> = {
    method: 'DELETE',
    path,
  };

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
