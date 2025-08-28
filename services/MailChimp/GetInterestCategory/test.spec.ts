import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves interest category information', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock inputs
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    interestCategoryId:
      process.env.MAILCHIMP_TEST_INTEREST_CATEGORY_ID || 'test-category-id',
    outputVariable: 'interestCategoryInfo',
  });

  // Verify output was set
  expect(ctx.outputs['interestCategoryInfo']).toBeTruthy();
});
