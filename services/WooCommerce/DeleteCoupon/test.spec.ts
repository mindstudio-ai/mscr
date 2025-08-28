import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a coupon and saves output to variable', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');

  // Mock the WooCommerce API response
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 123,
          code: 'TESTCOUPON',
          status: 'trash',
        }),
    }),
  );

  const ctx = await runConnector(handler, {
    couponId: '123',
    force: 'true',
    outputVariable: 'deletedCoupon',
  });

  expect(ctx.outputs.deletedCoupon).toBeTruthy();
  expect(ctx.outputs.deletedCoupon.id).toBe(123);
});
