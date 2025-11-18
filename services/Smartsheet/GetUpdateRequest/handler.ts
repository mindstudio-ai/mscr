import { GetUpdateRequestInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetUpdateRequestInputs>) => {
  const { sheetId, updateRequestId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!updateRequestId) {
    throw new Error('Update Request ID is required');
  }

  log(`Getting update request ${updateRequestId}`);

  try {
    const response = await smartsheetApiRequest({
      method: 'GET',
      path: `/sheets/${sheetId}/updaterequests/${updateRequestId}`,
    });
    log('Retrieved update request successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get update request: ${error.message}`);
  }
};
