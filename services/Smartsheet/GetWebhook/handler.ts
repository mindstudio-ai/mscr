import { GetWebhookInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetWebhookInputs>) => {
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
