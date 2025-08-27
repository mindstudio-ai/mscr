import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets campaign recipient info', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: process.env.TEST_CAMPAIGN_ID || 'test-campaign-id',
    subscriberHash: 'test@example.com',
    outputVariable: 'recipientInfo',
  });

  expect(ctx.outputs['recipientInfo']).toBeDefined();
});
