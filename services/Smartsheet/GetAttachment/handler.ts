import { GetAttachmentInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetAttachmentInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, attachmentId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!attachmentId) {
    throw new Error('Attachment ID is required');
  }

  log(`Getting attachment ${attachmentId} from sheet ${sheetId}`);

  try {
    const response = await smartsheetApiRequest({
      method: 'GET',
      path: `/sheets/${sheetId}/attachments/${attachmentId}`,
    });
    log(`Successfully retrieved attachment: ${(response as any).name}`);
    setOutput(outputVariable, response);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';
    if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
      throw new Error('Sheet or attachment not found');
    }
    throw new Error(`Failed to get attachment: ${errorMessage}`);
  }
};
