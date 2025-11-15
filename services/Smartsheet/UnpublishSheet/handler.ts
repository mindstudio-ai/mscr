import smartsheet from 'smartsheet';
import { UnpublishSheetInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: UnpublishSheetInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Unpublishing sheet ${sheetId}`);

  try {
    const response = await client.sheets.setPublishStatus({
      sheetId,
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
