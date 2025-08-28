import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists WooCommerce coupons', async () => {
  // Set up environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    page: '1',
    perPage: '10',
    outputVariable: 'coupons',
  });

  expect(ctx.outputs.coupons).toBeDefined();
  expect(Array.isArray(ctx.outputs.coupons)).toBe(true);
});
