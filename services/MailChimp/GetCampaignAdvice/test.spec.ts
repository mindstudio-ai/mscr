import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets campaign advice and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Skip test if API key is not available
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX) {
    console.log('Skipping test: Missing Mailchimp API credentials');
    return;
  }

  const ctx = await runConnector(handler, {
    campaignId: process.env.MAILCHIMP_TEST_CAMPAIGN_ID || '123456', // Use test campaign ID if available
    outputVariable: 'campaignAdvice',
  });

  expect(ctx.outputs['campaignAdvice']).toBeDefined();
});
