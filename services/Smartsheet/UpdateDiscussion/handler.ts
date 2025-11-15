import smartsheet from 'smartsheet';
import { UpdateDiscussionInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: UpdateDiscussionInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, discussionId, title, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!discussionId) {
    throw new Error('Discussion ID is required');
  }
  if (!title) {
    throw new Error('New title is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Updating discussion ${discussionId}`);

  try {
    const response = await client.sheets.updateDiscussion({
      sheetId,
      discussionId,
      body: { title },
    });
    log('Discussion updated successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to update discussion: ${error.message}`);
  }
};
