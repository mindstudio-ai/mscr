import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves survey reports and saves to output variable', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    fields: 'id,title,total_responses',
    count: '5',
    outputVariable: 'surveyReports',
  });

  expect(ctx.outputs['surveyReports']).toBeTruthy();
});
