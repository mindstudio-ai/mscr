import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a webhook and saves output', async () => {
  // Set up environment
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    webhookUrl: 'https://example.com/webhook',
    eventTypes: ['post.sent', 'subscription.confirmed'],
    description: 'Test webhook',
    outputVariable: 'webhookData',
  });

  expect(ctx.outputs['webhookData']).toBeTruthy();
});
