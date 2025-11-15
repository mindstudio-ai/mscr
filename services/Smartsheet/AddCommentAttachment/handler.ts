import smartsheet from 'smartsheet';
import { AddCommentAttachmentInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: AddCommentAttachmentInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, commentId, filePath, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!commentId) {
    throw new Error('Comment ID is required');
  }
  if (!filePath) {
    throw new Error('File path is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Adding attachment to comment ${commentId}`);

  try {
    const response = await client.sheets.attachFileToComment({
      sheetId,
      commentId,
      file: filePath,
    });
    log(`Successfully added attachment with ID: ${response.result.id}`);
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to add comment attachment: ${error.message}`);
  }
};
