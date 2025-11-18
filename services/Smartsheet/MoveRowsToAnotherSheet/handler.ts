import { MoveRowsToAnotherSheetInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<MoveRowsToAnotherSheetInputs>) => {
  const {
    sheetId,
    include,
    ignorerowsnotfound,
    rowids,
    toSheetid,
    outputVariable,
  } = inputs;
  if (!sheetId) {
    throw new Error('sheetId is required');
  }
  const path = `/sheets/${sheetId}/rows/move`;
  const queryParams: Record<string, string | number | boolean> = {};
  if (include !== undefined && include !== null) {
    queryParams['include'] = include;
  }
  if (ignorerowsnotfound !== undefined && ignorerowsnotfound !== null) {
    queryParams['ignoreRowsNotFound'] = ignorerowsnotfound;
  }
  const body: Record<string, any> = {};
  if (rowids !== undefined) {
    body['rowIds'] = rowids;
  }
  if (toSheetid !== undefined) {
    body['to.sheetId'] = toSheetid;
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
