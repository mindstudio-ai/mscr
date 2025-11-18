import { GetWebhookInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetWebhookInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { webhookId, outputVariable } = inputs;

  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

  try {
    log(`Retrieving webhook ${webhookId}...`);

    const result = await smartsheetApiRequest({
      method: 'GET',
      path: `/webhooks/${webhookId}`,
    });

    log(`Successfully retrieved webhook: ${(result as any).name}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error getting webhook: ${error.message}`);
    throw error;
  }
};
