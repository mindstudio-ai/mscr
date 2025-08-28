import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets landing page report and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outreachId: process.env.MAILCHIMP_TEST_LANDING_PAGE_ID || '00dfc2e1f0',
    fields: 'id,name,visits,unique_visits',
    outputVariable: 'landingPageReport',
  });

  expect(ctx.outputs['landingPageReport']).toBeTruthy();
});
