import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('sets campaign content and saves output', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: process.env.TEST_CAMPAIGN_ID || 'test-campaign-id',
    contentSource: 'direct',
    htmlContent:
      '<h1>Test Campaign</h1><p>This is a test campaign content.</p>',
    plainTextContent: 'Test Campaign\n\nThis is a test campaign content.',
    outputVariable: 'campaignContentResult',
  });

  expect(ctx.outputs['campaignContentResult']).toBeTruthy();
});
