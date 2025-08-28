import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates WooCommerce order', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock the WooCommerce API response
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 123,
          status: 'completed',
          customer_note: 'Test note',
        }),
    }),
  );

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    orderId: '123',
    status: 'completed',
    customerNote: 'Test note',
    outputVariable: 'updatedOrder',
  });

  expect(ctx.outputs.updatedOrder).toBeTruthy();
  expect(ctx.outputs.updatedOrder.id).toBe(123);
  expect(ctx.outputs.updatedOrder.status).toBe('completed');
});
