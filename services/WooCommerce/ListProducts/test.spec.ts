import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists products and saves to output variable', async () => {
  // Set up environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    perPage: '5',
    page: '1',
    outputVariable: 'productsList',
  });

  expect(ctx.outputs['productsList']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['productsList'])).toBe(true);
});
