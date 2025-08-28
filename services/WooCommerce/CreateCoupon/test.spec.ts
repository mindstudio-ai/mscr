import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a coupon and saves output', async () => {
  // Set up environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');

  // Generate a unique coupon code for testing
  const uniqueCode = `TEST${Date.now()}`;

  const ctx = await runConnector(handler, {
    code: uniqueCode,
    discountType: 'percent',
    amount: '10',
    description: 'Test coupon',
    individualUse: 'false',
    excludeSaleItems: 'false',
    minimumAmount: '50.00',
    outputVariable: 'couponData',
  });

  expect(ctx.outputs['couponData']).toBeTruthy();
  expect(ctx.outputs['couponData'].code).toBe(uniqueCode);
  expect(ctx.outputs['couponData'].discount_type).toBe('percent');
});
