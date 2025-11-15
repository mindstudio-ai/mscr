import smartsheet from 'smartsheet';
import { UpdateFolderInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: UpdateFolderInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { folderId, name, outputVariable } = inputs;

  if (!folderId) {
    throw new Error('Folder ID is required');
  }
  if (!name) {
    throw new Error('New name is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Updating folder ${folderId}`);

  try {
    const response = await client.folders.updateFolder({
      folderId,
      body: { name },
    });
    log('Folder updated successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to update folder: ${error.message}`);
  }
};
