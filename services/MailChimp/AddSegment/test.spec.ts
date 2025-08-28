import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a segment successfully', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    name: 'Test Segment',
    segmentType: 'dynamic',
    matchType: 'all',
    outputVariable: 'segmentResult',
  });

  expect(ctx.outputs.segmentResult).toBeTruthy();
});
