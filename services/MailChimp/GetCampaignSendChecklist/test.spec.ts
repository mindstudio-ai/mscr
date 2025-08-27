import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets campaign send checklist', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock campaign ID - this should be a valid campaign ID for testing
  const ctx = await runConnector(handler, {
    campaignId: process.env.MAILCHIMP_TEST_CAMPAIGN_ID || 'test-campaign-id',
    outputVariable: 'checklistResult',
  });

  // Verify output was set
  expect(ctx.outputs['checklistResult']).toBeTruthy();
});
