import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates product variation and saves output', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      id: 456,
      regular_price: '29.99',
      status: 'publish',
    }),
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    productId: '123',
    variationId: '456',
    regularPrice: '29.99',
    status: 'publish',
    outputVariable: 'updatedVariation',
  });

  expect(global.fetch).toHaveBeenCalled();
  expect(ctx.outputs.updatedVariation).toBeTruthy();
  expect(ctx.outputs.updatedVariation.id).toBe(456);
});
