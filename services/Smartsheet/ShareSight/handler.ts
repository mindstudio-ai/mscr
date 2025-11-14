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
  const { sightId, email, accessLevel, outputVariable } = inputs;

  if (!sightId) {
    throw new Error('Sight ID is required');
  }
  if (!email) {
    throw new Error('Email address is required');
  }
  if (!accessLevel) {
    throw new Error('Access level is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Sharing dashboard ${sightId} with ${email}`);

  try {
    const response = await client.sights.share({
      sightId,
      body: {
        email,
        accessLevel: accessLevel.toUpperCase(),
      },
    });
    log('Dashboard shared successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to share dashboard: ${error.message}`);
  }
};
