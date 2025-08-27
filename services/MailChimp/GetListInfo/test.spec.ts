import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves list info and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock list ID - use a real list ID for actual testing
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    includeTotalContacts: 'true',
    outputVariable: 'listInfo',
  });

  expect(ctx.outputs['listInfo']).toBeTruthy();
  expect(ctx.outputs['listInfo'].id).toBeDefined();
});
