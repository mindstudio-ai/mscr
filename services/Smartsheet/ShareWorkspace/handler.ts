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
  const { workspaceId, shares, sendEmail, message, outputVariable } = inputs;

  if (!workspaceId) {
    throw new Error('Workspace ID is required');
  }

  if (!shares || !Array.isArray(shares) || shares.length === 0) {
    throw new Error('Shares array is required');
  }

  const accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Sharing workspace ${workspaceId}...`);

    const options: any = {
      workspaceId,
      body: shares,
    };

    if (sendEmail !== undefined) {
      options.queryParameters = { sendEmail };
    }

    if (message) {
      options.body.forEach((share: any) => {
        share.message = message;
      });
    }

    const result = await client.workspaces.share(options);

    log(`Successfully shared workspace with ${shares.length} users/groups`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error sharing workspace: ${error.message}`);
    throw error;
  }
};
