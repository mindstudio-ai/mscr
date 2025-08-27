import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists tiers and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    expandStats: 'true',
    expandPrices: 'true',
    outputVariable: 'tiers',
  });

  expect(ctx.outputs['tiers']).toBeTruthy();
});
