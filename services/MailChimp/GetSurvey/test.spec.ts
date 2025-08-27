import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets survey details and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    surveyId: 'test-survey-id',
    outputVariable: 'surveyDetails',
  });

  expect(ctx.outputs['surveyDetails']).toBeTruthy();
});
