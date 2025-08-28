import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves interest details', async () => {
  // Set environment variables needed for the test
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock inputs for the handler
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    interestCategoryId:
      process.env.MAILCHIMP_TEST_CATEGORY_ID || 'test-category-id',
    interestId: process.env.MAILCHIMP_TEST_INTEREST_ID || 'test-interest-id',
    outputVariable: 'interestDetails',
  });

  // Verify that the output was set
  expect(ctx.outputs['interestDetails']).toBeTruthy();
});
