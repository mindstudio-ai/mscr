import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets member info and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock inputs
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    subscriberId:
      process.env.MAILCHIMP_TEST_SUBSCRIBER_EMAIL || 'test@example.com',
    outputVariable: 'memberInfo',
  });

  // Verify output was set
  expect(ctx.outputs['memberInfo']).toBeTruthy();
});
