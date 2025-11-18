import { UpdateSheetSummaryFieldsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: UpdateSheetSummaryFieldsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, fieldsJson, renameIfConflict, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!fieldsJson) {
    throw new Error('Fields JSON is required');
  }

  log('Updating sheet summary fields');

  try {
    const queryParams: Record<string, boolean> = {};
    if (renameIfConflict !== undefined) {
      queryParams.renameIfConflict = renameIfConflict;
    }

    const fields = JSON.parse(fieldsJson);
    const response = await smartsheetApiRequest({
      method: 'PUT',
      path: `/sheets/${sheetId}/summaryfields`,
      queryParams,
      body: { fields },
    });
    const result = Array.isArray(response) ? response : [response];
    log(`Updated ${result.length} field(s) successfully`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    throw new Error(`Failed to update sheet summary fields: ${error.message}`);
  }
};
