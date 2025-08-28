import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a product variation and saves output', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 201,
    json: async () => ({
      id: 123,
      regular_price: '19.99',
      attributes: [{ id: 1, option: 'Red' }],
    }),
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    productId: '100',
    regularPrice: '19.99',
    attributes: [{ id: 1, option: 'Red' }],
    outputVariable: 'createdVariation',
  });

  expect(global.fetch).toHaveBeenCalled();
  expect(ctx.outputs.createdVariation).toBeTruthy();
  expect(ctx.outputs.createdVariation.id).toBe(123);
});
