import smartsheet from 'smartsheet';
import { CreateDiscussionInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: CreateDiscussionInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, title, commentText, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!title) {
    throw new Error('Discussion title is required');
  }
  if (!commentText) {
    throw new Error('Comment text is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Creating discussion: ${title}`);

  try {
    const response = await client.sheets.createDiscussion({
      sheetId,
      body: {
        title,
        comment: { text: commentText },
      },
    });
    log('Discussion created successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to create discussion: ${error.message}`);
  }
};
