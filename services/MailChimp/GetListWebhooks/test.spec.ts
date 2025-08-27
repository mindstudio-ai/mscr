import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves list webhooks', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || '123456abcde',
    outputVariable: 'webhooksData',
  });

  // Check that output was set
  expect(ctx.outputs['webhooksData']).toBeDefined();
});
