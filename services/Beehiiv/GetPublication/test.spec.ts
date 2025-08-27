import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('fetches publication data', async () => {
  // Set the API key in the environment
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');

  // Use a valid publication ID from your Beehiiv account for testing
  const ctx = await runConnector(handler, {
    publicationId: 'pub_ad76629e-4a39-43ad-8055-0ee89dc6db15', // Example ID from docs
    includeStats: 'stats',
    outputVariable: 'publicationData',
  });

  // Check that the output variable contains publication data
  expect(ctx.outputs['publicationData']).toBeTruthy();
  expect(ctx.outputs['publicationData'].id).toBeDefined();
  expect(ctx.outputs['publicationData'].name).toBeDefined();
});
