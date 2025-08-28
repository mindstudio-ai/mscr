import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves product categories', async () => {
  // Set environment variables for the test
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    perPage: "5",
    page: "1",
    order: "asc",
    orderby: "name",
    hideEmpty: "false",
    outputVariable: 'categories'
  });

  expect(ctx.outputs['categories']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['categories'])).toBe(true);
});