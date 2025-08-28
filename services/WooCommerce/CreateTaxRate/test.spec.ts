import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a tax rate and saves output', async () => {
  // Set up environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    name: 'Test Tax Rate',
    country: 'US',
    state: 'CA',
    rate: '7.5',
    cities: 'San Francisco, Oakland',
    postcodes: '94101, 94102',
    class: 'standard',
    shipping: 'false',
    compound: 'false',
    outputVariable: 'taxRate',
  });

  expect(ctx.outputs['taxRate']).toBeTruthy();
  expect(ctx.outputs['taxRate'].id).toBeDefined();
  expect(ctx.outputs['taxRate'].name).toBe('Test Tax Rate');
});
