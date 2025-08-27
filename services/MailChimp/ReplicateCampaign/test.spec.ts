import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('replicates campaign and saves output', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock campaign ID - this should be a valid campaign ID for testing
  const campaignId =
    process.env.MAILCHIMP_TEST_CAMPAIGN_ID || 'test-campaign-id';

  const ctx = await runConnector(handler, {
    campaignId: campaignId,
    outputVariable: 'replicatedCampaign',
  });

  expect(ctx.outputs['replicatedCampaign']).toBeTruthy();
  expect(ctx.outputs['replicatedCampaign'].id).toBeTruthy();
});
