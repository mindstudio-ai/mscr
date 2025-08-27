import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves interest categories and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    count: '10',
    offset: '0',
    type: '',
    outputVariable: 'interestCategories',
  });

  expect(ctx.outputs['interestCategories']).toBeTruthy();
});
