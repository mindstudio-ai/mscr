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
  const { webhookId, name, enabled, events, callbackUrl, outputVariable } =
    inputs;

  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

  const accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Updating webhook ${webhookId}...`);

    const webhookSpec: any = {};

    if (name) {
      webhookSpec.name = name;
    }
    if (enabled !== undefined) {
      webhookSpec.enabled = enabled;
    }
    if (events) {
      webhookSpec.events = events;
    }
    if (callbackUrl) {
      webhookSpec.callbackUrl = callbackUrl;
    }

    const result = await client.webhooks.updateWebhook({
      webhookId,
      body: webhookSpec,
    });

    log(`Successfully updated webhook: ${webhookId}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error updating webhook: ${error.message}`);
    throw error;
  }
};
