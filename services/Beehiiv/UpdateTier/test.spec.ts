import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates tier and saves output to variable', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    tierId: 'tier_00000000-0000-0000-0000-000000000000',
    name: 'Updated Tier Name',
    description: 'Updated tier description',
    updatePrices: 'no',
    outputVariable: 'updatedTier',
  });

  expect(ctx.outputs['updatedTier']).toBeTruthy();
});
