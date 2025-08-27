import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('unpublishes a survey and saves output', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    surveyId: process.env.MAILCHIMP_TEST_SURVEY_ID || 'test-survey-id',
    outputVariable: 'surveyResult',
  });

  // Just verify the output variable is set
  expect(ctx.outputs['surveyResult']).toBeDefined();
});
