import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates interest in category and saves output', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    interestCategoryId: 'test-category-id',
    name: 'Test Interest',
    displayOrder: '1',
    outputVariable: 'createdInterest',
  });

  expect(ctx.outputs['createdInterest']).toBeTruthy();
});
