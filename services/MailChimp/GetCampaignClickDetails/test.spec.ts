import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves campaign click details to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: process.env.MAILCHIMP_TEST_CAMPAIGN_ID || 'test-campaign-id',
    count: '10',
    sortField: 'total_clicks',
    sortDir: 'DESC',
    outputVariable: 'clickDetails',
  });

  expect(ctx.outputs['clickDetails']).toBeTruthy();
});
