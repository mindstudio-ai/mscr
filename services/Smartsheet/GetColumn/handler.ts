import smartsheet from 'smartsheet';
import { GetColumnInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetColumnInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, columnId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!columnId) {
    throw new Error('Column ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Getting column ${columnId} from sheet ${sheetId}`);

  try {
    const response = await client.sheets.getColumn({ sheetId, columnId });
    log(`Retrieved column: ${response.title}`);
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get column: ${error.message}`);
  }
};
