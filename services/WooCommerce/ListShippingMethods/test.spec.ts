import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists shipping methods for a zone', async () => {
  // Set environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    zoneId: '1', // Use a test zone ID
    outputVariable: 'shippingMethods',
  });

  expect(ctx.outputs['shippingMethods']).toBeDefined();
  expect(Array.isArray(ctx.outputs['shippingMethods'])).toBe(true);
});
