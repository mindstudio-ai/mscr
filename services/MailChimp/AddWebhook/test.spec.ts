import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a webhook and saves output', async () => {
  // Set required environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Skip test if API credentials aren't available
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX) {
    console.log('Skipping test: Missing Mailchimp credentials');
    return;
  }

  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || '123456', // Use test list ID if available
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
    outputVariable: 'webhookResult',
  });

  // Just verify that the output variable was set
  expect(ctx.outputs.webhookResult).toBeDefined();
});
