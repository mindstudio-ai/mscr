import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves segment members and saves to output variable', async () => {
  // Setup environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Skip test if API key is not available
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX) {
    console.log('Skipping test: Missing MailChimp API credentials');
    return;
  }

  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    segmentId: process.env.MAILCHIMP_TEST_SEGMENT_ID || 'test-segment-id',
    count: '5',
    offset: '0',
    includeUnsubscribed: 'false',
    includeCleaned: 'false',
    includeTransactional: 'false',
    outputVariable: 'segmentMembers',
  });

  expect(ctx.outputs['segmentMembers']).toBeDefined();
});
