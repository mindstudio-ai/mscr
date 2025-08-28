import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists interests in category', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID,
    interestCategoryId: process.env.MAILCHIMP_TEST_CATEGORY_ID,
    outputVariable: 'interestsResult',
  });

  expect(ctx.outputs['interestsResult']).toBeTruthy();
  expect(ctx.outputs['interestsResult'].interests).toBeDefined();
  expect(Array.isArray(ctx.outputs['interestsResult'].interests)).toBe(true);
});
