import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves currency data and saves to output variable', async () => {
  // Set environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    currencyCode: 'USD',
    outputVariable: 'currencyData',
  });

  expect(ctx.outputs['currencyData']).toBeTruthy();
  expect(ctx.outputs['currencyData'].code).toBeDefined();
  expect(ctx.outputs['currencyData'].name).toBeDefined();
  expect(ctx.outputs['currencyData'].symbol).toBeDefined();
});
