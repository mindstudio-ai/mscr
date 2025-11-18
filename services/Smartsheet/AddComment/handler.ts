import { AddCommentInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: AddCommentInputs;
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

  log(`Adding comment to discussion ${discussionId}`);

  try {
    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/discussions/${discussionId}/comments`,
      body: { text },
    });
    log('Comment added successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to add comment: ${error.message}`);
  }
};
