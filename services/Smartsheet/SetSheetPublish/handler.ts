import smartsheet from 'smartsheet';
import { SetSheetPublishInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: SetSheetPublishInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, readOnlyLiteEnabled, readOnlyFullEnabled, outputVariable } =
    inputs;

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
    const publishBody: any = {};
    if (readOnlyLiteEnabled !== undefined) {
      publishBody.readOnlyLiteEnabled = readOnlyLiteEnabled === 'true';
    }
    if (readOnlyFullEnabled !== undefined) {
      publishBody.readOnlyFullEnabled = readOnlyFullEnabled === 'true';
    }

    const response = await client.sheets.setPublishStatus({
      sheetId,
      body: publishBody,
    });
    log('Publish status set successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to set publish status: ${error.message}`);
  }
};
