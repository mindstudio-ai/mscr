import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves customers from WooCommerce', async () => {
  // Set up environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    page: '1',
    perPage: '10',
    order: 'asc',
    orderby: 'name',
    outputVariable: 'customers',
  });

  expect(ctx.outputs['customers']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['customers'])).toBe(true);
});
