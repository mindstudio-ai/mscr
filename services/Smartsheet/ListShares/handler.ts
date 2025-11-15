import smartsheet from 'smartsheet';
import { ListSharesInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListSharesInputs;
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
  log(`Listing shares for sheet ${sheetId}`);

  try {
    const response = await client.sheets.listShares({ sheetId });
    const shares = response.data || [];
    log(`Found ${shares.length} share(s)`);
    setOutput(outputVariable, {
      totalCount: shares.length,
      shares,
    });
  } catch (error: any) {
    throw new Error(`Failed to list shares: ${error.message}`);
  }
};
