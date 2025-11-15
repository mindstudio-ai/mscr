import smartsheet from 'smartsheet';
import { GetSheetSummaryFieldInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetSheetSummaryFieldInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, fieldId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!fieldId) {
    throw new Error('Field ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Getting summary field ${fieldId}`);

  try {
    const response = await client.sheets.getSheetSummaryField({
      sheetId,
      fieldId,
    });
    log('Retrieved field successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get sheet summary field: ${error.message}`);
  }
};
