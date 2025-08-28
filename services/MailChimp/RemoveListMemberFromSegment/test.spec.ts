import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('removes member from segment', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock inputs
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    segmentId: 'test-segment-id',
    subscriberEmail: 'test@example.com',
  });

  // We expect no error to be thrown
  expect(ctx.error).toBeUndefined();
});
