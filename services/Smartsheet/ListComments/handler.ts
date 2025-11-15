import smartsheet from 'smartsheet';
import { ListCommentsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListCommentsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, rowId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    let response;
    if (rowId) {
      log(`Listing comments for row ${rowId}`);
      response = await client.sheets.getRow({
        sheetId,
        rowId,
        queryParameters: { include: 'discussions' },
      });
      const comments =
        response.discussions?.flatMap((d: any) => d.comments || []) || [];
      setOutput(outputVariable, { totalCount: comments.length, comments });
    } else {
      log(`Listing all comments for sheet ${sheetId}`);
      response = await client.sheets.getSheet({
        sheetId,
        queryParameters: { include: 'discussions' },
      });
      const comments =
        response.discussions?.flatMap((d: any) => d.comments || []) || [];
      setOutput(outputVariable, { totalCount: comments.length, comments });
    }
    log(`Found ${comments.length} comment(s)`);
  } catch (error: any) {
    throw new Error(`Failed to list comments: ${error.message}`);
  }
};
