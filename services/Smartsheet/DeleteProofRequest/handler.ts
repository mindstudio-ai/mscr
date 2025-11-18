import { DeleteProofRequestInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<DeleteProofRequestInputs>) => {
  const { sheetId, proofRequestId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!proofRequestId) {
    throw new Error('Proof request ID is required');
  }

  log(`Deleting proof request ${proofRequestId}`);

  try {
    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/sheets/${sheetId}/proofrequests/${proofRequestId}`,
    });
    log('Proof request deleted successfully');
    setOutput(outputVariable, {
      success: true,
      deletedProofRequestId: proofRequestId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete proof request: ${error.message}`);
  }
};
