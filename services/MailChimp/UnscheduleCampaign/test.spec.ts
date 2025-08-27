import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('unschedules campaign successfully', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: process.env.MAILCHIMP_TEST_CAMPAIGN_ID || 'test-campaign-id',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
});
