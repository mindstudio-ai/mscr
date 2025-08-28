import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates interest category and saves output', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    title: 'Test Interest Category',
    type: 'checkboxes',
    displayOrder: '1',
    outputVariable: 'interestCategory',
  });

  expect(ctx.outputs['interestCategory']).toBeTruthy();
});
