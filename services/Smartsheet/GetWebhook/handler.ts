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
  const { webhookId, outputVariable } = inputs;

  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

  const accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Retrieving webhook ${webhookId}...`);

    const result = await client.webhooks.getWebhook({ webhookId });

    log(`Successfully retrieved webhook: ${result.name}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error getting webhook: ${error.message}`);
    throw error;
  }
};
