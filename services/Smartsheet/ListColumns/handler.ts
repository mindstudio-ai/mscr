import smartsheet from 'smartsheet';
import { ListColumnsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListColumnsInputs;
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
  log(`Listing columns for sheet: ${sheetId}`);

  try {
    const response = await client.sheets.getColumns({ sheetId });
    log(`Found ${response.data?.length || 0} column(s)`);
    setOutput(outputVariable, {
      totalCount: response.totalCount,
      columns: response.data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list columns: ${error.message}`);
  }
};
