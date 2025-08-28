import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves abuse reports for a list', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock inputs
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    count: '10',
    offset: '0',
    outputVariable: 'abuseReports',
  });

  // Verify output was set
  expect(ctx.outputs['abuseReports']).toBeTruthy();
});
