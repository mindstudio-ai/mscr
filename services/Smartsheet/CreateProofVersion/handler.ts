import { CreateProofVersionInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<CreateProofVersionInputs>) => {
  const {
    sheetId,
    proofId,
    attachmentsubtype,
    attachmenttype,
    description,
    name,
    url,
    outputVariable,
  } = inputs;
  if (!sheetId) {
    throw new Error('sheetId is required');
  }
  if (!proofId) {
    throw new Error('proofId is required');
  }
  const path = `/sheets/${sheetId}/proofs/${proofId}/versions`;
  const body: Record<string, any> = {};
  if (attachmentsubtype !== undefined) {
    body['attachmentSubType'] = attachmentsubtype;
  }
  if (attachmenttype !== undefined) {
    body['attachmentType'] = attachmenttype;
  }
  if (description !== undefined) {
    body['description'] = description;
  }
  if (name !== undefined) {
    body['name'] = name;
  }
  if (url !== undefined) {
    body['url'] = url;
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
