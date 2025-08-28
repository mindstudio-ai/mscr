import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves order refund', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');

  // Mock WooCommerce API response
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 726,
          date_created: '2023-01-01T12:00:00',
          amount: '10.00',
          reason: 'Customer request',
        }),
    }),
  );

  const ctx = await runConnector(handler, {
    orderId: '723',
    refundId: '726',
    decimalPoints: '2',
    outputVariable: 'refundData',
  });

  expect(ctx.outputs['refundData']).toBeTruthy();
  expect(ctx.outputs['refundData'].id).toBe(726);
});
