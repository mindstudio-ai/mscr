import smartsheet from 'smartsheet';
import { DeleteSightInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: DeleteSightInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sightId, outputVariable } = inputs;

  if (!sightId) {
    throw new Error('Sight ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Deleting dashboard ${sightId}`);

  try {
    await client.sights.deleteSight({ sightId });
    log('Dashboard deleted successfully');
    setOutput(outputVariable, {
      success: true,
      deletedSightId: sightId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete dashboard: ${error.message}`);
  }
};
