import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('archives a list member', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock inputs
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    subscriberIdentifier:
      process.env.MAILCHIMP_TEST_EMAIL || 'test@example.com',
  });

  // Since this is a deletion operation that returns no content,
  // we just verify the function ran without throwing an error
  expect(ctx.success).toBe(true);
});
