import smartsheet from 'smartsheet';
import { CopyFolderInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: CopyFolderInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { folderId, destinationType, destinationId, newName, outputVariable } =
    inputs;

  if (!folderId) {
    throw new Error('Folder ID is required');
  }
  if (!destinationType) {
    throw new Error('Destination type is required');
  }
  if (!newName) {
    throw new Error('New name is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Copying folder ${folderId} to ${destinationType}`);

  try {
    const copyBody: any = {
      destinationType: destinationType.toLowerCase(),
      newName,
    };
    if (destinationId && destinationType.toLowerCase() !== 'home') {
      copyBody.destinationId = parseInt(destinationId, 10);
    }

    const response = await client.folders.copyFolder({
      folderId,
      body: copyBody,
    });
    log('Folder copied successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to copy folder: ${error.message}`);
  }
};
