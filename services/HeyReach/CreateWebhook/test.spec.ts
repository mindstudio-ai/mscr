import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates webhook and saves output', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    webhookName: 'Test Webhook',
    webhookUrl: 'https://example.com/webhook',
    eventType: 'MESSAGE_SENT',
    campaignIds: '',
    outputVariable: 'webhookResult',
  });

  expect(ctx.outputs['webhookResult']).toBeTruthy();
});
