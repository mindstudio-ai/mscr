import { GetSentUpdateRequestInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetSentUpdateRequestInputs>) => {
  const { sheetId, sentUpdateRequestId, outputVariable } = inputs;
  if (!sheetId) {
    throw new Error('sheetId is required');
  }
  if (!sentUpdateRequestId) {
    throw new Error('sentUpdateRequestId is required');
  }
  const path = `/sheets/${sheetId}/sentupdaterequests/${sentUpdateRequestId}`;

  const requestOptions: Record<string, any> = {
    method: 'GET',
    path,
  };

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
