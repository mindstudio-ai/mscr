import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves abuse report details', async () => {
  // Set up environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock inputs for the test
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    reportId: process.env.MAILCHIMP_TEST_REPORT_ID || 'test-report-id',
    fields: 'id,email_address,date',
    excludeFields: '_links',
    outputVariable: 'abuseReport',
  });

  // Verify that the output was set
  expect(ctx.outputs['abuseReport']).toBeDefined();
});
