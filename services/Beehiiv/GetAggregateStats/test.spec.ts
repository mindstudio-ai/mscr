import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves aggregate stats and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_test123',
    audience: 'all',
    platform: 'all',
    status: 'all',
    contentTags: '',
    hiddenFromFeed: 'all',
    outputVariable: 'aggregateStats',
  });

  expect(ctx.outputs['aggregateStats']).toBeTruthy();
});
