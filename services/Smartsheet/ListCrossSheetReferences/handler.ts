import smartsheet from 'smartsheet';
import { ListCrossSheetReferencesInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListCrossSheetReferencesInputs;
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
  log(`Listing cross-sheet references for sheet ${sheetId}`);

  try {
    const response = await client.sheets.listCrossSheetReferences({ sheetId });
    log(`Found ${response.totalCount || 0} cross-sheet reference(s)`);
    setOutput(outputVariable, {
      totalCount: response.totalCount,
      references: response.data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list cross-sheet references: ${error.message}`);
  }
};
