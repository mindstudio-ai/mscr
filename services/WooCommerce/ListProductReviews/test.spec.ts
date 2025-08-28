import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves product reviews', async () => {
  // Set environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    status: 'approved',
    perPage: '5',
    page: '1',
    order: 'desc',
    orderby: 'date_gmt',
    outputVariable: 'reviews',
  });

  expect(ctx.outputs['reviews']).toBeDefined();
  expect(Array.isArray(ctx.outputs['reviews'])).toBe(true);
});
