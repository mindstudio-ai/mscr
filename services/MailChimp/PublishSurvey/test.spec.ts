import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('publishes survey and saves output', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: '123abc456def',
    surveyId: '789ghi012jkl',
    outputVariable: 'surveyResult',
  });

  expect(ctx.outputs['surveyResult']).toBeTruthy();
});
