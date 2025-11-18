import { CreateProofDiscussionInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<CreateProofDiscussionInputs>) => {
  const { sheetId, proofId, comment, text, outputVariable } = inputs;
  if (!sheetId) {
    throw new Error('sheetId is required');
  }
  if (!proofId) {
    throw new Error('proofId is required');
  }
  const path = `/sheets/${sheetId}/proofs/${proofId}/discussions`;
  const body: Record<string, any> = {};
  if (comment !== undefined) {
    body['comment'] = comment;
  }
  if (text !== undefined) {
    body['text'] = text;
  }

  const requestOptions: Record<string, any> = {
    method: 'POST',
    path,
  };
  if (Object.keys(body).length > 0) {
    requestOptions.body = body;
  }

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
