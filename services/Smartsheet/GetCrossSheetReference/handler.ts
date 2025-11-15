import smartsheet from 'smartsheet';
import { GetCrossSheetReferenceInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetCrossSheetReferenceInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, crossSheetReferenceId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!crossSheetReferenceId) {
    throw new Error('Cross-sheet Reference ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Getting cross-sheet reference ${crossSheetReferenceId}`);

  try {
    const response = await client.sheets.getCrossSheetReference({
      sheetId,
      crossSheetReferenceId,
    });
    log('Retrieved cross-sheet reference successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get cross-sheet reference: ${error.message}`);
  }
};
