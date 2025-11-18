import { DeleteUpdateRequestInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<DeleteUpdateRequestInputs>) => {
  const { sheetId, updateRequestId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!updateRequestId) {
    throw new Error('Update Request ID is required');
  }

  log(`Deleting update request ${updateRequestId}`);

  try {
    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/sheets/${sheetId}/updaterequests/${updateRequestId}`,
    });
    log('Update request deleted successfully');
    setOutput(outputVariable, {
      success: true,
      deletedUpdateRequestId: updateRequestId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete update request: ${error.message}`);
  }
};
