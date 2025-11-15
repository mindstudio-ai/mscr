import smartsheet from 'smartsheet';
import { DeleteShareInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: DeleteShareInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, shareId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!shareId) {
    throw new Error('Share ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Deleting share ${shareId}`);

  try {
    await client.sheets.deleteShare({ sheetId, shareId });
    log('Share deleted successfully');
    setOutput(outputVariable, {
      success: true,
      deletedShareId: shareId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete share: ${error.message}`);
  }
};
