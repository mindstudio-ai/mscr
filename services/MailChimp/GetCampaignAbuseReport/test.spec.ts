import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets campaign abuse report', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: process.env.MAILCHIMP_TEST_CAMPAIGN_ID || 'test-campaign-id',
    reportId: process.env.MAILCHIMP_TEST_REPORT_ID || 'test-report-id',
    fields: 'id,email_address,date',
    excludeFields: '_links',
    outputVariable: 'abuseReport',
  });

  // We're just checking that the handler doesn't throw and sets an output
  expect(ctx.outputs['abuseReport']).toBeDefined();
});
