import smartsheet from 'smartsheet';
import { AddDiscussionCommentInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: AddDiscussionCommentInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, discussionId, text, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!discussionId) {
    throw new Error('Discussion ID is required');
  }
  if (!text) {
    throw new Error('Comment text is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Adding comment to discussion ${discussionId}`);

  try {
    const response = await client.sheets.addComment({
      sheetId,
      discussionId,
      body: { text },
    });
    log('Comment added successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to add comment: ${error.message}`);
  }
};
