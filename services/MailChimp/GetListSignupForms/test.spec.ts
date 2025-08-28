import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves signup forms for a list', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Run the connector with test inputs
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    outputVariable: 'signupForms',
  });

  // Verify output was set
  expect(ctx.outputs['signupForms']).toBeTruthy();
});
