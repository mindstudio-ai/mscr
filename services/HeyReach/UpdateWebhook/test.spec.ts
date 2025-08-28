import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates webhook and saves response to output variable', async () => {
  // Set the API key in the environment
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    webhookId: '1234',
    webhookName: 'Updated Webhook',
    webhookUrl: 'https://example.com/webhook',
    eventType: 'MESSAGE_SENT',
    campaignIds: '123,456',
    isActive: 'true',
    outputVariable: 'updateResult',
  });

  expect(ctx.outputs['updateResult']).toBeTruthy();
});
