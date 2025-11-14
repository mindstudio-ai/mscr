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
  const { outputVariable } = inputs;

  const accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log('Retrieving current user information...');

    const result = await client.users.getCurrentUser();

    log(`Successfully retrieved current user: ${result.email}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error getting current user: ${error.message}`);
    throw error;
  }
};
