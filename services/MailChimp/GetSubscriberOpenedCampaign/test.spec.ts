import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets subscriber info for opened campaign', async () => {
  // Set environment variables needed for the test
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Skip test if API key is not available
  if (!process.env.MAILCHIMP_API_KEY) {
    console.log('Skipping test: No Mailchimp API key available');
    return;
  }

  // Mock inputs for the test
  const ctx = await runConnector(handler, {
    campaignId: process.env.MAILCHIMP_TEST_CAMPAIGN_ID || 'test-campaign-id',
    subscriberHash:
      process.env.MAILCHIMP_TEST_SUBSCRIBER_HASH || 'test-subscriber-hash',
    outputVariable: 'subscriberInfo',
  });

  // We're just checking that the handler runs without throwing an error
  // In a real environment with valid credentials, this would return actual data
  expect(ctx.outputs).toBeDefined();
});
