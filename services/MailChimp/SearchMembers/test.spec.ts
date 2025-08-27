import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('searches members and saves output to variable', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    query: 'test@example.com',
    listId: '',
    outputVariable: 'searchResults',
  });

  expect(ctx.outputs['searchResults']).toBeTruthy();
});
