import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a WooCommerce product', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 201,
    json: async () => ({
      id: 794,
      name: 'Test Product',
      type: 'simple',
      price: '21.99',
      regular_price: '21.99',
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    name: 'Test Product',
    type: 'simple',
    regularPrice: '21.99',
    status: 'publish',
    outputVariable: 'createdProduct',
  });

  expect(ctx.outputs.createdProduct).toBeTruthy();
  expect(ctx.outputs.createdProduct.id).toBe(794);
  expect(ctx.outputs.createdProduct.name).toBe('Test Product');
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
