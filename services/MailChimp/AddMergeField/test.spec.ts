import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds merge field to list', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID,
    name: 'Test Field',
    type: 'text',
    required: false,
    public: true,
    outputVariable: 'mergeField',
  });

  expect(ctx.outputs['mergeField']).toBeTruthy();
  expect(ctx.outputs['mergeField'].name).toBe('Test Field');
});
