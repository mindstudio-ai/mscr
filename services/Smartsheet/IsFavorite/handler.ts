import { IsFavoriteInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<IsFavoriteInputs>) => {
  const { favoriteType, favoriteId, include, outputVariable } = inputs;
  if (!favoriteType) {
    throw new Error('favoriteType is required');
  }
  if (!favoriteId) {
    throw new Error('favoriteId is required');
  }
  const path = `/favorites/${favoriteType}/${favoriteId}`;
  const queryParams: Record<string, string | number | boolean> = {};
  if (include !== undefined && include !== null) {
    queryParams['include'] = include;
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
