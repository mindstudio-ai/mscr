import { DeleteProofVersionInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<DeleteProofVersionInputs>) => {
  const { sheetId, proofId, outputVariable } = inputs;
  if (!sheetId) {
    throw new Error('sheetId is required');
  }
  if (!proofId) {
    throw new Error('proofId is required');
  }
  const path = `/sheets/${sheetId}/proofs/${proofId}/versions`;

  const requestOptions: Record<string, any> = {
    method: 'DELETE',
    path,
  };

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
