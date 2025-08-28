import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a refund and saves output', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  const { handler } = await import('./handler.ts');

  // Mock the WooCommerce API response
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 456,
          date_created: '2023-07-21T17:07:11',
          amount: '10.00',
          reason: 'Customer request',
        }),
    }),
  );

  const ctx = await runConnector(handler, {
    orderId: '123',
    refundId: '456',
    outputVariable: 'deletedRefund',
  });

  expect(ctx.outputs['deletedRefund']).toBeTruthy();
  expect(ctx.outputs['deletedRefund'].id).toBe(456);
});
