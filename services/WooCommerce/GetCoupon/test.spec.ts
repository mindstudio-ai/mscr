import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves coupon details', async () => {
  // Set environment variables needed for the test
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');

  // Mock coupon ID - this should be a valid coupon ID in your test environment
  const couponId = process.env.TEST_COUPON_ID || '1';

  const ctx = await runConnector(handler, {
    couponId,
    outputVariable: 'couponData',
  });

  // Verify that output was set
  expect(ctx.outputs.couponData).toBeTruthy();
  expect(ctx.outputs.couponData.id).toBeDefined();
  expect(ctx.outputs.couponData.code).toBeDefined();
});
