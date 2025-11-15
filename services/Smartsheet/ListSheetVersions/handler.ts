import smartsheet from 'smartsheet';
import { ListSheetVersionsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListSheetVersionsInputs;
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
  log(`Listing versions for sheet ${sheetId}`);

  try {
    const response = await client.sheets.listSheetVersions({ sheetId });
    const versions = response.data || [];
    log(`Found ${versions.length} version(s)`);
    setOutput(outputVariable, {
      totalCount: versions.length,
      versions,
    });
  } catch (error: any) {
    throw new Error(`Failed to list sheet versions: ${error.message}`);
  }
};
