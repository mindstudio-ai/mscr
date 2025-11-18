import { DeleteSheetSummaryFieldsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: DeleteSheetSummaryFieldsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, ids, ignoreSummaryFieldsNotFound, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!ids) {
    throw new Error('Field IDs are required');
  }

  log('Deleting sheet summary fields');

  try {
    const idArray = ids.split(',').map((id: string) => id.trim());
    const queryParams: Record<string, string | boolean> = {
      ids: idArray.join(','),
    };
    if (ignoreSummaryFieldsNotFound !== undefined) {
      queryParams.ignoreSummaryFieldsNotFound = ignoreSummaryFieldsNotFound;
    }

    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/sheets/${sheetId}/summaryfields`,
      queryParams,
    });
    log(`Deleted ${idArray.length} field(s) successfully`);
    setOutput(outputVariable, {
      success: true,
      deletedCount: idArray.length,
      deletedFieldIds: idArray,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete sheet summary fields: ${error.message}`);
  }
};
