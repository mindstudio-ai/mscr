import { UpdateWebhookInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<UpdateWebhookInputs>) => {
  const { webhookId, name, enabled, events, callbackUrl, outputVariable } =
    inputs;

  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

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

    const result = await smartsheetApiRequest({
      method: 'PUT',
      path: `/webhooks/${webhookId}`,
      body: webhookSpec,
    });

    log(`Successfully updated webhook: ${webhookId}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error updating webhook: ${error.message}`);
    throw error;
  }
};
