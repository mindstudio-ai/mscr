import smartsheet from 'smartsheet';
import { SetSheetPublishInputs } from './type';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<SetSheetPublishInputs>) => {
  const { sheetId, outputVariable, ...publishSettings } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Setting publish status for sheet ${sheetId}`);

  try {
    const response = await client.sheets.setPublishStatus({
      sheetId,
      body: publishSettings,
    });
    log('Publish status set successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to set publish status: ${error.message}`);
  }
};
