import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves Facebook ad product activity report', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outreachId: process.env.MAILCHIMP_TEST_OUTREACH_ID || 'test-outreach-id',
    count: '5',
    outputVariable: 'productActivityReport',
  });

  expect(ctx.outputs['productActivityReport']).toBeTruthy();
});
