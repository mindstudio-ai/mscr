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
  const { userId, transferTo, removeFromSharing, outputVariable } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  const accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Removing user ${userId}...`);

    const options: any = { userId };
    if (transferTo) {
      options.queryParameters = { transferTo };
    }
    if (removeFromSharing !== undefined) {
      options.queryParameters = {
        ...options.queryParameters,
        removeFromSharing,
      };
    }

    const result = await client.users.removeUser(options);

    log(`Successfully removed user: ${userId}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error removing user: ${error.message}`);
    throw error;
  }
};
