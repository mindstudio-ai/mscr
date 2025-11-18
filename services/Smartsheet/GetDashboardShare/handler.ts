import { GetDashboardShareInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetDashboardShareInputs>) => {
  const { sightId, shareId, accessapilevel, outputVariable } = inputs;
  if (!sightId) {
    throw new Error('sightId is required');
  }
  if (!shareId) {
    throw new Error('shareId is required');
  }
  const path = `/sights/${sightId}/shares/${shareId}`;
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
