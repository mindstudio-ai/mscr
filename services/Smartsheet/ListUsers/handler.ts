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
  const { email, includeAll, outputVariable } = inputs;

  const accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log('Listing users in organization...');

    const options: any = {};
    if (email) {
      options.queryParameters = { email };
    }
    if (includeAll) {
      options.queryParameters = {
        ...options.queryParameters,
        includeAll: true,
      };
    }

    const result = await client.users.listUsers(options);

    log(`Successfully retrieved ${result.totalCount} users`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error listing users: ${error.message}`);
    throw error;
  }
};
