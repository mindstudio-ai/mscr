import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates segment and saves output', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    segmentId: 'test-segment-id',
    name: 'Updated Segment Name',
    matchType: 'all',
    outputVariable: 'updatedSegment',
  });

  expect(ctx.outputs['updatedSegment']).toBeTruthy();
});
