import { MoveFolderInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

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

  log(`Moving folder ${folderId} to ${destinationType}`);

  try {
    const moveBody: any = {
      destinationType: destinationType.toLowerCase(),
    };
    if (destinationId && destinationType.toLowerCase() !== 'home') {
      moveBody.destinationId = parseInt(destinationId, 10);
    }

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/folders/${folderId}/move`,
      body: moveBody,
    });
    log('Folder moved successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to move folder: ${error.message}`);
  }
};
