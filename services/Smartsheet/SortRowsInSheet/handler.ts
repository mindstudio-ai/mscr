import { SortRowsInSheetInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<SortRowsInSheetInputs>) => {
  const { sheetId, includeExclude, sortcriteria, outputVariable } = inputs;
  if (!sheetId) {
    throw new Error('sheetId is required');
  }
  const path = `/sheets/${sheetId}/sort`;
  const queryParams: Record<string, string | number | boolean> = {};
  if (includeExclude !== undefined && includeExclude !== null) {
    queryParams['include&exclude'] = includeExclude;
  }
  const body: Record<string, any> = {};
  if (sortcriteria !== undefined) {
    body['sortCriteria'] = sortcriteria;
  }

  const requestOptions: Record<string, any> = {
    method: 'POST',
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
