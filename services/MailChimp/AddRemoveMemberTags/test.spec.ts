import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds and removes tags from a member', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    emailAddress: 'test@example.com',
    tagsToAdd: 'test-tag-1,test-tag-2',
    tagsToRemove: 'old-tag',
    skipAutomations: 'false',
    outputVariable: 'result',
  });

  expect(ctx.outputs.result).toBeTruthy();
});
