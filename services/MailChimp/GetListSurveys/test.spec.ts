import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves surveys for a list', async () => {
  // Set up environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    outputVariable: 'surveyResults',
  });

  expect(ctx.outputs['surveyResults']).toBeDefined();
});
