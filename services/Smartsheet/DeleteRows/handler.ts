import { DeleteRowsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<DeleteRowsInputs>) => {
  const { sheetId, ids, ignoreRowsNotFound, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!ids) {
    throw new Error('Row IDs are required');
  }

  log('Deleting rows');

  try {
    const idArray = ids.split(',').map((id: string) => id.trim());
    const queryParams: Record<string, string | boolean> = {
      ids: idArray.join(','),
    };
    if (ignoreRowsNotFound !== undefined) {
      queryParams.ignoreRowsNotFound = ignoreRowsNotFound;
    }

    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/sheets/${sheetId}/rows`,
      queryParams,
    });
    log(`Deleted ${idArray.length} row(s) successfully`);
    setOutput(outputVariable, {
      success: true,
      deletedCount: idArray.length,
      deletedRowIds: idArray,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete rows: ${error.message}`);
  }
};
