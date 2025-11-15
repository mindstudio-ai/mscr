import smartsheet from 'smartsheet';
import { GetUpdateRequestInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetUpdateRequestInputs;
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
  log(`Getting update request ${updateRequestId}`);

  try {
    const response = await client.sheets.getUpdateRequest({
      sheetId,
      updateRequestId,
    });
    log('Retrieved update request successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get update request: ${error.message}`);
  }
};
