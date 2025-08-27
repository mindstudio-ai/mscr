import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets segment information', async () => {
  // Set the API key for testing
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_12345678-1234-1234-1234-123456789012',
    segmentId: 'seg_12345678-1234-1234-1234-123456789012',
    includeStats: 'true',
    outputVariable: 'segmentInfo',
  });

  expect(ctx.outputs['segmentInfo']).toBeTruthy();
});
