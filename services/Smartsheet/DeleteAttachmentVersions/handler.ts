import { DeleteAttachmentVersionsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<DeleteAttachmentVersionsInputs>) => {
  const { sheetId, attachmentId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!attachmentId) {
    throw new Error('Attachment ID is required');
  }

  log(`Deleting all versions of attachment ${attachmentId}`);

  try {
    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/sheets/${sheetId}/attachments/${attachmentId}/versions`,
    });
    log('Successfully deleted all attachment versions');
    setOutput(outputVariable, {
      success: true,
      deletedAttachmentId: attachmentId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete versions: ${error.message}`);
  }
};
