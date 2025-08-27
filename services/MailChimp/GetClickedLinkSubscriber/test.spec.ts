import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets clicked link subscriber info', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: process.env.MAILCHIMP_TEST_CAMPAIGN_ID || 'test-campaign-id',
    linkId: process.env.MAILCHIMP_TEST_LINK_ID || 'test-link-id',
    subscriberHash:
      process.env.MAILCHIMP_TEST_SUBSCRIBER_HASH || 'test-subscriber-hash',
    outputVariable: 'subscriberInfo',
  });

  // Just verify that the output variable was set
  expect(ctx.outputs['subscriberInfo']).toBeDefined();
});
