import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves survey question report', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock inputs for the test
  const ctx = await runConnector(handler, {
    surveyId: 'test-survey-id',
    questionId: 'test-question-id',
    fields: 'id,query,total_responses',
    outputVariable: 'surveyQuestionData',
  });

  // Verify output was set
  expect(ctx.outputs['surveyQuestionData']).toBeTruthy();
});
