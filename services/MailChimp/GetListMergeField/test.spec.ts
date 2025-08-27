import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets merge field and saves to output variable', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    mergeId: process.env.MAILCHIMP_TEST_MERGE_ID || 'test-merge-id',
    fields: 'merge_id,tag,name',
    outputVariable: 'mergeFieldInfo',
  });

  expect(ctx.outputs['mergeFieldInfo']).toBeTruthy();
});
