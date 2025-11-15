import smartsheet from 'smartsheet';
import { ListOrganizationSheetsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListOrganizationSheetsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { outputVariable } = inputs;

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log('Listing all organization sheets');

  try {
    const response = await client.sheets.listOrganizationSheets();
    log(`Found ${response.totalCount || 0} sheet(s)`);
    setOutput(outputVariable, {
      totalCount: response.totalCount,
      sheets: response.data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list organization sheets: ${error.message}`);
  }
};
