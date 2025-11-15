import smartsheet from 'smartsheet';
import { DeleteFolderInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: DeleteFolderInputs;
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
  log(`Deleting folder ${folderId}`);

  try {
    await client.folders.deleteFolder({ folderId });
    log('Folder deleted successfully');
    setOutput(outputVariable, {
      success: true,
      deletedFolderId: folderId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete folder: ${error.message}`);
  }
};
