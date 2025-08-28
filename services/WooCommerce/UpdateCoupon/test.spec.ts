import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates a coupon and saves output', async () => {
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');

  // Mock the WooCommerce API client
  vi.mock('@woocommerce/woocommerce-rest-api', () => {
    return {
      default: class WooCommerceRestApi {
        constructor() {}
        put() {
          return Promise.resolve({
            data: {
              id: 719,
              amount: '5',
              discount_type: 'percent',
              description: 'Updated coupon',
            },
          });
        }
      },
    };
  });

  const ctx = await runConnector(handler, {
    couponId: '719',
    amount: '5',
    description: 'Updated coupon',
    discountType: 'percent',
    outputVariable: 'updatedCoupon',
  });

  expect(ctx.outputs['updatedCoupon']).toBeTruthy();
  expect(ctx.outputs['updatedCoupon'].id).toBe(719);
  expect(ctx.outputs['updatedCoupon'].amount).toBe('5');
});
