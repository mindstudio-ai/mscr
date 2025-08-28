import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves campaign link details', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock inputs for the test
  const ctx = await runConnector(handler, {
    campaignId: process.env.TEST_CAMPAIGN_ID || 'test-campaign-id',
    linkId: process.env.TEST_LINK_ID || 'test-link-id',
    outputVariable: 'linkDetails',
  });

  // Verify that the output was set
  expect(ctx.outputs['linkDetails']).toBeDefined();
});
