import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('searches tags and saves output to variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || '123456', // Use test list ID if available
    tagName: '', // Empty to get all tags
    outputVariable: 'tagResults',
  });

  expect(ctx.outputs['tagResults']).toBeTruthy();
});
