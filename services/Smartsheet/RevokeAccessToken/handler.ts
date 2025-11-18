import { RevokeAccessTokenInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<RevokeAccessTokenInputs>) => {
  const { deleteallforapiclient, outputVariable } = inputs;
  const path = `/token`;
  const queryParams: Record<string, string | number | boolean> = {};
  if (deleteallforapiclient !== undefined && deleteallforapiclient !== null) {
    queryParams['deleteAllForApiClient'] = deleteallforapiclient;
  }

  const requestOptions: Record<string, any> = {
    method: 'DELETE',
    path,
  };
  if (Object.keys(queryParams).length > 0) {
    requestOptions.queryParams = queryParams;
  }

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
