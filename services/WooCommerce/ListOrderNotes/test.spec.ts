import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves order notes', async () => {
  // Set environment variables for WooCommerce
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    orderId: '723',
    noteType: 'any',
    outputVariable: 'orderNotes',
  });

  expect(ctx.outputs['orderNotes']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['orderNotes'])).toBe(true);
});
