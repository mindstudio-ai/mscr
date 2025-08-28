import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves survey response', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock inputs
  const ctx = await runConnector(handler, {
    surveyId: 'test-survey-id',
    responseId: 'test-response-id',
    outputVariable: 'surveyResponse',
  });

  // Verify output was set
  expect(ctx.outputs['surveyResponse']).toBeTruthy();
});
