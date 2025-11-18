import { DeleteColumnInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<DeleteColumnInputs>) => {
  const { sheetId, columnId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!columnId) {
    throw new Error('Column ID is required');
  }

  log(`Deleting column ${columnId} from sheet ${sheetId}`);

  try {
    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/sheets/${sheetId}/columns/${columnId}`,
    });
    log('Successfully deleted column');
    setOutput(outputVariable, {
      success: true,
      deletedColumnId: columnId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete column: ${error.message}`);
  }
};
