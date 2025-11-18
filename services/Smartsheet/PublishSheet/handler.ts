import { PublishSheetInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<PublishSheetInputs>) => {
  const { sheetId, readOnlyLiteEnabled, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Publishing sheet ${sheetId}`);

  try {
    const publishBody: any = {
      readOnlyLiteEnabled: readOnlyLiteEnabled === 'false' ? false : true,
    };

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/publish`,
      body: publishBody,
    });
    log('Sheet published successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to publish sheet: ${error.message}`);
  }
};
