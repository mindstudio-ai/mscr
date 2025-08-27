import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets survey report and saves to output variable', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    surveyId: 'test-survey-id',
    outputVariable: 'surveyReport',
  });

  expect(ctx.outputs['surveyReport']).toBeTruthy();
});
