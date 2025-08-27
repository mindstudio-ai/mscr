import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets subscriber email activity', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: 'test-campaign-id',
    subscriberHash: 'test@example.com',
    outputVariable: 'emailActivity',
  });

  expect(ctx.outputs['emailActivity']).toBeTruthy();
});
