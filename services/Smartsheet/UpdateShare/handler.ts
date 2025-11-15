import smartsheet from 'smartsheet';
import { UpdateShareInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: UpdateShareInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, shareId, accessLevel, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!shareId) {
    throw new Error('Share ID is required');
  }
  if (!accessLevel) {
    throw new Error('Access level is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Updating share ${shareId}`);

  try {
    const response = await client.sheets.updateShare({
      sheetId,
      shareId,
      body: { accessLevel: accessLevel.toUpperCase() },
    });
    log('Share updated successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to update share: ${error.message}`);
  }
};
