import { DeleteWebhookInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<DeleteWebhookInputs>) => {
  const { webhookId, outputVariable } = inputs;

  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

  try {
    log(`Deleting webhook ${webhookId}...`);

    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/webhooks/${webhookId}`,
    });

    log(`Successfully deleted webhook: ${webhookId}`);
    setOutput(outputVariable, { success: true, deletedWebhookId: webhookId });
  } catch (error: any) {
    log(`Error deleting webhook: ${error.message}`);
    throw error;
  }
};
