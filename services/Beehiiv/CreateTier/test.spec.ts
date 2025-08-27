import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a tier and saves output', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    name: 'Test Tier',
    description: 'A test tier created by the connector',
    addPricing: 'no',
    outputVariable: 'createdTier',
  });

  expect(ctx.outputs['createdTier']).toBeTruthy();
});
