import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates merge field and saves output', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID,
    mergeId: process.env.MAILCHIMP_TEST_MERGE_ID,
    name: 'Updated Field Name',
    tag: 'UPDTAG',
    required: 'false',
    defaultValue: 'Default Value',
    public: 'true',
    displayOrder: '1',
    helpText: 'This is help text',
    outputVariable: 'updatedMergeField',
  });

  expect(ctx.outputs['updatedMergeField']).toBeTruthy();
  expect(ctx.outputs['updatedMergeField'].name).toBe('Updated Field Name');
});
