import { UnpublishSheetInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<UnpublishSheetInputs>) => {
  const { sheetId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Unpublishing sheet ${sheetId}`);

  try {
    await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/publish`,
      body: { readOnlyLiteEnabled: false, readOnlyFullEnabled: false },
    });
    log('Sheet unpublished successfully');
    setOutput(outputVariable, {
      success: true,
      sheetId,
    });
  } catch (error: any) {
    throw new Error(`Failed to unpublish sheet: ${error.message}`);
  }
};
