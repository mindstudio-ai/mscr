import { DeleteFolderInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

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

  log(`Deleting folder ${folderId}`);

  try {
    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/folders/${folderId}`,
    });
    log('Folder deleted successfully');
    setOutput(outputVariable, {
      success: true,
      deletedFolderId: folderId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete folder: ${error.message}`);
  }
};
