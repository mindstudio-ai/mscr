import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a refund and saves output', async () => {
  // Set environment variables
  process.env.url = 'https://example-store.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 726,
      date_created: '2023-05-21T17:07:11',
      amount: '10.00',
      reason: 'Test refund',
      refunded_by: 1,
      refunded_payment: true,
    }),
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    orderId: '123',
    amount: '10.00',
    reason: 'Test refund',
    apiRefund: 'true',
    apiRestock: 'true',
    outputVariable: 'refundResult',
  });

  expect(ctx.outputs.refundResult).toBeTruthy();
  expect(ctx.outputs.refundResult.id).toBe(726);
  expect(ctx.outputs.refundResult.amount).toBe('10.00');

  // Verify fetch was called with correct parameters
  expect(fetch).toHaveBeenCalledWith(
    'https://example-store.com/wp-json/wc/v3/orders/123/refunds',
    expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        'Content-Type': 'application/json',
      }),
    }),
  );
});
