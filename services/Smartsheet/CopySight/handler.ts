import smartsheet from 'smartsheet';
import { CopySightInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: CopySightInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sightId, newName, destinationFolderId, outputVariable } = inputs;

  if (!sightId) {
    throw new Error('Sight ID is required');
  }
  if (!newName) {
    throw new Error('New dashboard name is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Copying dashboard ${sightId} to ${newName}`);

  try {
    const copyBody: any = {
      destinationType: destinationFolderId ? 'folder' : 'home',
      newName,
    };
    if (destinationFolderId) {
      copyBody.destinationId = parseInt(destinationFolderId, 10);
    }

    const response = await client.sights.copySight({
      sightId,
      body: copyBody,
    });
    log('Dashboard copied successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to copy dashboard: ${error.message}`);
  }
};
