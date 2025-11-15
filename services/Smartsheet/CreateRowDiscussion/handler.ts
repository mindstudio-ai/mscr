import smartsheet from 'smartsheet';
import { CreateRowDiscussionInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: CreateRowDiscussionInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, rowId, title, commentText, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!rowId) {
    throw new Error('Row ID is required');
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
  log(`Creating discussion on row ${rowId}: ${title}`);

  try {
    const response = await client.sheets.createRowDiscussion({
      sheetId,
      rowId,
      body: {
        title,
        comment: { text: commentText },
      },
    });
    log('Row discussion created successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to create row discussion: ${error.message}`);
  }
};
