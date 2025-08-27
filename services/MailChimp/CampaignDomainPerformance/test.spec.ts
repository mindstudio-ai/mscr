import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves campaign domain performance', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Skip test if API key is not available
  if (!process.env.apiKey || !process.env.serverPrefix) {
    console.log('Skipping test: Mailchimp API credentials not available');
    return;
  }

  const ctx = await runConnector(handler, {
    campaignId: process.env.MAILCHIMP_TEST_CAMPAIGN_ID || 'test-campaign-id',
    outputVariable: 'domainPerformance',
  });

  expect(ctx.outputs['domainPerformance']).toBeDefined();
  expect(ctx.outputs['domainPerformance'].campaign_id).toBeDefined();
});
