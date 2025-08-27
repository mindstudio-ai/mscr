import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates interest in Mailchimp list', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    interestCategoryId:
      process.env.MAILCHIMP_TEST_CATEGORY_ID || 'test-category-id',
    interestId: process.env.MAILCHIMP_TEST_INTEREST_ID || 'test-interest-id',
    name: 'Updated Interest Name',
    displayOrder: '2',
    outputVariable: 'updatedInterest',
  });

  expect(ctx.outputs['updatedInterest']).toBeTruthy();
});
