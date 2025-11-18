import { SearchEverythingInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<SearchEverythingInputs>) => {
  const {
    query,
    location,
    modifiedsince,
    include,
    scopes,
    scopesValue,
    outputVariable,
  } = inputs;
  const path = `/search`;
  const queryParams: Record<string, string | number | boolean> = {};
  if (query !== undefined && query !== null) {
    queryParams['query'] = query;
  }
  if (location !== undefined && location !== null) {
    queryParams['location'] = location;
  }
  if (modifiedsince !== undefined && modifiedsince !== null) {
    queryParams['modifiedSince'] = modifiedsince;
  }
  if (include !== undefined && include !== null) {
    queryParams['include'] = include;
  }
  if (scopes !== undefined && scopes !== null) {
    queryParams['scopes'] = scopes;
  }
  if (scopesValue !== undefined && scopesValue !== null) {
    queryParams['scopes'] = scopesValue;
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
