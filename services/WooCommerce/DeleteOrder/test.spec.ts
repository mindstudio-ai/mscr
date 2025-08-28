import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes an order and saves output', async () => {
  // Set environment variables
  process.env.url = 'https://example-store.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Mock global fetch
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ id: 727, status: 'trash' }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    orderId: '727',
    force: 'false',
    outputVariable: 'deletedOrder',
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'https://example-store.com/wp-json/wc/v3/orders/727?force=false',
    expect.objectContaining({
      method: 'DELETE',
    }),
  );

  expect(ctx.outputs.deletedOrder).toBeTruthy();
  expect(ctx.outputs.deletedOrder.id).toBe(727);
});
