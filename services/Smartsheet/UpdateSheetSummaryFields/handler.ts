import { UpdateSheetSummaryFieldsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<UpdateSheetSummaryFieldsInputs>) => {
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
