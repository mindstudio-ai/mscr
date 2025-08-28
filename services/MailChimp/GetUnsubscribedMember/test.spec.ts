import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves unsubscribed member data', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: process.env.MAILCHIMP_TEST_CAMPAIGN_ID || 'test-campaign-id',
    subscriberHash:
      process.env.MAILCHIMP_TEST_SUBSCRIBER_HASH || 'test-subscriber-hash',
    outputVariable: 'unsubscribedMember',
  });

  expect(ctx.outputs['unsubscribedMember']).toBeTruthy();
});
