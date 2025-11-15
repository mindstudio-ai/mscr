import smartsheet from 'smartsheet';
import { UpdateSightInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: UpdateSightInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sightId, name, outputVariable } = inputs;

  if (!sightId) {
    throw new Error('Sight ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Updating dashboard ${sightId}`);

  try {
    const updateBody: any = {};
    if (name) {
      updateBody.name = name;
    }

    const response = await client.sights.updateSight({
      sightId,
      body: updateBody,
    });
    log('Dashboard updated successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to update dashboard: ${error.message}`);
  }
};
