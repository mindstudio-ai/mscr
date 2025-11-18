import { DeleteShareInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<DeleteShareInputs>) => {
  const { sheetId, shareId, accessApiLevel, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!shareId) {
    throw new Error('Share ID is required');
  }

  log(`Deleting share ${shareId}`);

  try {
    const queryParams: Record<string, number> = {};
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }

    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/sheets/${sheetId}/shares/${shareId}`,
      queryParams,
    });
    log('Share deleted successfully');
    setOutput(outputVariable, {
      success: true,
      deletedShareId: shareId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete share: ${error.message}`);
  }
};
