import { UpdateUpdateRequestInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<UpdateUpdateRequestInputs>) => {
  const { sheetId, updateRequestId, subject, message, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!updateRequestId) {
    throw new Error('Update Request ID is required');
  }

  log(`Updating update request ${updateRequestId}`);

  try {
    const updateBody: any = {};
    if (subject) {
      updateBody.subject = subject;
    }
    if (message) {
      updateBody.message = message;
    }

    const response = await smartsheetApiRequest({
      method: 'PUT',
      path: `/sheets/${sheetId}/updaterequests/${updateRequestId}`,
      body: updateBody,
    });
    log('Update request updated successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to update update request: ${error.message}`);
  }
};
