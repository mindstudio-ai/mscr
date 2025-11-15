import smartsheet from 'smartsheet';
import { ListFolderContentsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListFolderContentsInputs;
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
  log(`Listing contents of folder ${folderId}`);

  try {
    const response = await client.folders.getFolderChildren({ folderId });

    setOutput(outputVariable, {
      totalCount: response.data?.length || 0,
      contents: response.data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list folder contents: ${error.message}`);
  }
};
