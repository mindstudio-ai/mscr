import { ListProofAttachmentsInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListProofAttachmentsInputs>) => {
  const { sheetId, proofId, page, pagesize, includeall, outputVariable } =
    inputs;
  if (!sheetId) {
    throw new Error('sheetId is required');
  }
  if (!proofId) {
    throw new Error('proofId is required');
  }
  const path = `/sheets/${sheetId}/proofs/${proofId}/attachments`;
  const queryParams: Record<string, string | number | boolean> = {};
  if (page !== undefined && page !== null) {
    queryParams['page'] = page;
  }
  if (pagesize !== undefined && pagesize !== null) {
    queryParams['pageSize'] = pagesize;
  }
  if (includeall !== undefined && includeall !== null) {
    queryParams['includeAll'] = includeall;
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
