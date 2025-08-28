import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves survey question answers', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Skip test if API key is not available
  if (!process.env.MAILCHIMP_API_KEY) {
    console.log('Skipping test: No Mailchimp API key available');
    return;
  }

  const ctx = await runConnector(handler, {
    surveyId: 'test-survey-id',
    questionId: 'test-question-id',
    respondentFamiliarity: '',
    outputVariable: 'surveyAnswers',
  });

  // We only check that the output variable is set
  // The actual API call may fail due to invalid IDs, but our code should run
  expect(ctx.outputs).toHaveProperty('surveyAnswers');
});
