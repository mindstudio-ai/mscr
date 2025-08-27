import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves campaign product activity', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: process.env.TEST_CAMPAIGN_ID || 'test-campaign-id',
    count: '10',
    offset: '0',
    outputVariable: 'productActivity',
  });

  expect(ctx.outputs['productActivity']).toBeDefined();
});
