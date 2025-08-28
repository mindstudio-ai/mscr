import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds a note to a subscriber', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID,
    subscriberEmail: process.env.MAILCHIMP_TEST_SUBSCRIBER_EMAIL,
    note: 'Test note from automated test',
    outputVariable: 'noteResult',
  });

  expect(ctx.outputs['noteResult']).toBeTruthy();
  expect(ctx.outputs['noteResult'].note).toBe('Test note from automated test');
});
