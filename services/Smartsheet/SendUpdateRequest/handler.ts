import smartsheet from 'smartsheet';
import { SendUpdateRequestInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: SendUpdateRequestInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, updateRequestId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!updateRequestId) {
    throw new Error('Update Request ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Sending update request ${updateRequestId}`);

  try {
    const response = await client.sheets.sendUpdateRequest({
      sheetId,
      updateRequestId,
    });
    log('Update request sent successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to send update request: ${error.message}`);
  }
};
