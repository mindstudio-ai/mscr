import smartsheet from 'smartsheet';
import { MoveSightInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: MoveSightInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sightId, destinationType, destinationId, outputVariable } = inputs;

  if (!sightId) {
    throw new Error('Sight ID is required');
  }
  if (!destinationType) {
    throw new Error('Destination type is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Moving dashboard ${sightId} to ${destinationType}`);

  try {
    const moveBody: any = {
      destinationType: destinationType.toLowerCase(),
    };
    if (destinationId && destinationType.toLowerCase() !== 'home') {
      moveBody.destinationId = parseInt(destinationId, 10);
    }

    const response = await client.sights.moveSight({
      sightId,
      body: moveBody,
    });
    log('Dashboard moved successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to move dashboard: ${error.message}`);
  }
};
