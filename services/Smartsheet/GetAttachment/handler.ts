import smartsheet from 'smartsheet';
import { GetAttachmentInputs } from './type';

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

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Getting attachment ${attachmentId} from sheet ${sheetId}`);

  try {
    const response = await client.sheets.getAttachment({
      sheetId,
      attachmentId,
    });
    log(`Successfully retrieved attachment: ${response.name}`);
    setOutput(outputVariable, response);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';
    if (error.statusCode === 404) {
      throw new Error('Sheet or attachment not found');
    }
    throw new Error(`Failed to get attachment: ${errorMessage}`);
  }
};
