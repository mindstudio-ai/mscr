import smartsheet from 'smartsheet';
import { AddSheetSummaryFieldsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: AddSheetSummaryFieldsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, fieldsJson, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!fieldsJson) {
    throw new Error('Fields JSON is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log('Adding sheet summary fields');

  try {
    const fields = JSON.parse(fieldsJson);
    const response = await client.sheets.addSheetSummaryFields({
      sheetId,
      body: fields,
    });
    log(`Added ${fields.length} field(s) successfully`);
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to add sheet summary fields: ${error.message}`);
  }
};
