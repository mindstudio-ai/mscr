import smartsheet from 'smartsheet';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
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
  log(`Getting dashboard ${sightId}`);

  try {
    const response = await client.sights.getSight({ sightId });
    log('Retrieved dashboard successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get dashboard: ${error.message}`);
  }
};
