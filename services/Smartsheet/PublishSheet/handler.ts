import smartsheet from 'smartsheet';
import { PublishSheetInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: PublishSheetInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, readOnlyLiteEnabled, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Publishing sheet ${sheetId}`);

  try {
    const publishBody: any = {
      readOnlyLiteEnabled: readOnlyLiteEnabled === 'false' ? false : true,
    };

    const response = await client.sheets.setPublishStatus({
      sheetId,
      body: publishBody,
    });
    log('Sheet published successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to publish sheet: ${error.message}`);
  }
};
