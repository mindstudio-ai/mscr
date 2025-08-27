import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists clicked link subscribers', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: 'test-campaign-id',
    linkId: 'test-link-id',
    count: '10',
    offset: '0',
    outputVariable: 'clickedSubscribers',
  });

  expect(ctx.outputs['clickedSubscribers']).toBeDefined();
});
