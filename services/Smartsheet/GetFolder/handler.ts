import smartsheet from 'smartsheet';
import { GetFolderInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetFolderInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { folderId, outputVariable } = inputs;

  if (!folderId) {
    throw new Error('Folder ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Getting folder ${folderId}`);

  try {
    const response = await client.folders.getFolder({ folderId });
    log('Retrieved folder successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get folder: ${error.message}`);
  }
};
