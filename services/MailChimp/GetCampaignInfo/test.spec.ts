import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves campaign info and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Skip test if API key or server prefix is not available
  if (!process.env.apiKey || !process.env.serverPrefix) {
    console.log(
      'Skipping test: MAILCHIMP_API_KEY or MAILCHIMP_SERVER_PREFIX not set',
    );
    return;
  }

  const ctx = await runConnector(handler, {
    campaignId: process.env.MAILCHIMP_TEST_CAMPAIGN_ID || 'test-campaign-id',
    includeResendShortcutEligibility: 'false',
    includeResendShortcutUsage: 'false',
    outputVariable: 'campaignInfo',
  });

  expect(ctx.outputs['campaignInfo']).toBeDefined();
});
