import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves landing page reports', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    count: '10',
    offset: '0',
    fields: '',
    excludeFields: '',
    outputVariable: 'landingPageReports',
  });

  expect(ctx.outputs['landingPageReports']).toBeTruthy();
});
