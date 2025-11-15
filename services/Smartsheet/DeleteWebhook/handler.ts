import smartsheet from 'smartsheet';
import { DeleteWebhookInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: DeleteWebhookInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { webhookId, outputVariable } = inputs;

  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Deleting webhook ${webhookId}...`);

    const result = await client.webhooks.deleteWebhook({ webhookId });

    log(`Successfully deleted webhook: ${webhookId}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error deleting webhook: ${error.message}`);
    throw error;
  }
};
