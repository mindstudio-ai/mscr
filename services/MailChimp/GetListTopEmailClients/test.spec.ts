import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves email clients and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || '123abc', // Use env var or fallback
    outputVariable: 'emailClients',
  });

  expect(ctx.outputs['emailClients']).toBeTruthy();
});
