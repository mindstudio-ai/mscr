import smartsheet from 'smartsheet';
import { MoveFolderInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: MoveFolderInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { folderId, destinationType, destinationId, outputVariable } = inputs;

  if (!folderId) {
    throw new Error('Folder ID is required');
  }
  if (!destinationType) {
    throw new Error('Destination type is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Moving folder ${folderId} to ${destinationType}`);

  try {
    const moveBody: any = {
      destinationType: destinationType.toLowerCase(),
    };
    if (destinationId && destinationType.toLowerCase() !== 'home') {
      moveBody.destinationId = parseInt(destinationId, 10);
    }

    const response = await client.folders.moveFolder({
      folderId,
      body: moveBody,
    });
    log('Folder moved successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to move folder: ${error.message}`);
  }
};
