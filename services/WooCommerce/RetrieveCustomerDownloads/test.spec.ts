import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves customer downloads', async () => {
  // Set up environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    customerId: '26', // Use a test customer ID
    outputVariable: 'customerDownloads',
  });

  expect(ctx.outputs['customerDownloads']).toBeDefined();
  expect(Array.isArray(ctx.outputs['customerDownloads'])).toBe(true);
});
