import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves list members and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock minimal inputs required
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    count: '5',
    outputVariable: 'membersList',
  });

  // Verify output was set
  expect(ctx.outputs['membersList']).toBeTruthy();
  expect(ctx.outputs['membersList'].members).toBeDefined();
});
