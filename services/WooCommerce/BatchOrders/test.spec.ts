import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('performs batch operations on WooCommerce orders', async () => {
  // Setup environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      create: [{ id: 1, status: 'processing' }],
      update: [{ id: 2, status: 'completed' }],
      delete: [{ id: 3, previous_status: 'cancelled' }],
    }),
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    createOrders: [
      {
        payment_method: 'bacs',
        line_items: [{ product_id: 123, quantity: 1 }],
      },
    ],
    updateOrders: [{ id: 2, status: 'completed' }],
    deleteOrders: '3',
    outputVariable: 'batchResult',
  });

  expect(ctx.outputs.batchResult).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
