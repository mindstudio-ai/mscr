import { SetSheetPublishInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<SetSheetPublishInputs>) => {
  const { sheetId, outputVariable, ...publishSettings } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Setting publish status for sheet ${sheetId}`);

  try {
    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/publish`,
      body: publishSettings,
    });
    log('Publish status set successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to set publish status: ${error.message}`);
  }
};
