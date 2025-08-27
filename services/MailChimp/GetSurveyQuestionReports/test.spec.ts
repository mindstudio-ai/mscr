import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets survey question reports', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    surveyId: 'test-survey-id',
    outputVariable: 'surveyQuestionReports',
  });

  expect(ctx.outputs['surveyQuestionReports']).toBeTruthy();
});
