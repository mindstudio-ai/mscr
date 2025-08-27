import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('fetches campaign reports', async () => {
  // Set environment variables needed for the test
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignType: '',
    count: '5',
    offset: '0',
    outputVariable: 'campaignReports',
  });

  expect(ctx.outputs['campaignReports']).toBeTruthy();
  expect(ctx.outputs['campaignReports'].reports).toBeDefined();
});
