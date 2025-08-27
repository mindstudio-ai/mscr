import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves campaign recipients', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: process.env.MAILCHIMP_TEST_CAMPAIGN_ID || 'test_campaign_id',
    count: '10',
    offset: '0',
    outputVariable: 'recipientsData',
  });

  expect(ctx.outputs['recipientsData']).toBeTruthy();
  expect(ctx.outputs['recipientsData'].campaign_id).toBeTruthy();
});
