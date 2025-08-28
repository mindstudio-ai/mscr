import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists webhooks and saves to output variable', async () => {
  // Set environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    status: 'all',
    page: '1',
    perPage: '10',
    outputVariable: 'webhooks',
  });

  expect(ctx.outputs['webhooks']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['webhooks'])).toBe(true);
});
