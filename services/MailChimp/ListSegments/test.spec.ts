import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves segments from a list', async () => {
  // Set environment variables needed for the test
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    count: '10',
    offset: '0',
    outputVariable: 'segments',
  });

  expect(ctx.outputs['segments']).toBeTruthy();
});
