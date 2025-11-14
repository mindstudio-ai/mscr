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

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log('Getting server information');

  try {
    const response = await client.server.getInfo();
    log('Retrieved server information successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get server info: ${error.message}`);
  }
};
