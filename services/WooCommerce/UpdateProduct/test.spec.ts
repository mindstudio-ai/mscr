import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates a WooCommerce product', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API call
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 123,
      name: 'Updated Product',
      regular_price: '24.99',
      price: '24.99',
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    productId: '123',
    name: 'Updated Product',
    regularPrice: '24.99',
    outputVariable: 'updatedProduct',
  });

  expect(ctx.outputs.updatedProduct).toBeTruthy();
  expect(ctx.outputs.updatedProduct.id).toBe(123);
  expect(ctx.outputs.updatedProduct.name).toBe('Updated Product');
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
