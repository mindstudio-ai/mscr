import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves tier information', async () => {
  // Set up environment variables
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');

  // Mock inputs
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    tierId: 'tier_00000000-0000-0000-0000-000000000000',
    includeStats: 'true',
    includePrices: 'true',
    outputVariable: 'tierInfo',
  });

  // Verify output was set
  expect(ctx.outputs['tierInfo']).toBeTruthy();
});
