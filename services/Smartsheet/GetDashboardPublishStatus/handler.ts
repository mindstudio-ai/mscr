import { GetDashboardPublishStatusInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetDashboardPublishStatusInputs>) => {
  const { sightId, outputVariable } = inputs;
  if (!sightId) {
    throw new Error('sightId is required');
  }
  const path = `/sights/${sightId}/publish`;

  const requestOptions: Record<string, any> = {
    method: 'GET',
    path,
  };

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
