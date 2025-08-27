import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets survey responses', async () => {
  // Set environment variables needed for the test
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock a simple survey ID
  const ctx = await runConnector(handler, {
    surveyId: '123abc',
    outputVariable: 'surveyResponses',
  });

  // Just verify that the output was set
  expect(ctx.outputs['surveyResponses']).toBeDefined();
});
