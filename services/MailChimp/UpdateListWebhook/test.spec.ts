import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates webhook and saves output to outputVar', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID,
    webhookId: process.env.MAILCHIMP_TEST_WEBHOOK_ID,
    url: 'https://example.com/webhook',
    subscribeEvent: 'true',
    unsubscribeEvent: 'true',
    profileEvent: 'true',
    cleanedEvent: 'true',
    upemailEvent: 'true',
    campaignEvent: 'true',
    userSource: 'true',
    adminSource: 'true',
    apiSource: 'true',
    outputVariable: 'outputVar',
  });

  expect(ctx.outputs['outputVar']).toBeTruthy();
});
