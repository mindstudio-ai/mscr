import { DeleteAttachmentInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<DeleteAttachmentInputs>) => {
  const { sheetId, attachmentId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!attachmentId) {
    throw new Error('Attachment ID is required');
  }

  log(`Deleting attachment ${attachmentId} from sheet ${sheetId}`);

  try {
    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/sheets/${sheetId}/attachments/${attachmentId}`,
    });
    log('Successfully deleted attachment');
    setOutput(outputVariable, {
      success: true,
      deletedAttachmentId: attachmentId,
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';
    throw new Error(`Failed to delete attachment: ${errorMessage}`);
  }
};
