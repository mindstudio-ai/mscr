import { UpdateProofRequestInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<UpdateProofRequestInputs>) => {
  const { sheetId, proofRequestId, message, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!proofRequestId) {
    throw new Error('Proof request ID is required');
  }

  log(`Updating proof request ${proofRequestId}`);

  try {
    const updateBody: any = {};
    if (message) {
      updateBody.message = message;
    }

    const response = await smartsheetApiRequest({
      method: 'PUT',
      path: `/sheets/${sheetId}/proofrequests/${proofRequestId}`,
      body: updateBody,
    });
    log('Proof request updated successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to update proof request: ${error.message}`);
  }
};
