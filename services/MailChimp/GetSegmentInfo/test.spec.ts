import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves segment info and saves to output variable', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    segmentId: 'test-segment-id',
    includeCleaned: 'false',
    includeTransactional: 'false',
    includeUnsubscribed: 'false',
    outputVariable: 'segmentInfo',
  });

  expect(ctx.outputs['segmentInfo']).toBeDefined();
});
