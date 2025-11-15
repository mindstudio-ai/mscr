import smartsheet from 'smartsheet';
import { ListDiscussionsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListDiscussionsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Listing discussions for sheet ${sheetId}`);

  try {
    const response = await client.sheets.getSheet({
      sheetId,
      queryParameters: { include: 'discussions' },
    });
    const discussions = response.discussions || [];
    log(`Found ${discussions.length} discussion(s)`);
    setOutput(outputVariable, {
      totalCount: discussions.length,
      discussions,
    });
  } catch (error: any) {
    throw new Error(`Failed to list discussions: ${error.message}`);
  }
};
