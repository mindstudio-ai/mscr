import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves product totals from WooCommerce', async () => {
  // Set up environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'productTotals',
  });

  // Verify the output was set
  expect(ctx.outputs['productTotals']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['productTotals'])).toBe(true);
});
