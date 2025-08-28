import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves payment gateway details', async () => {
  // Set up environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    gatewayId: 'bacs', // Direct bank transfer gateway
    outputVariable: 'gatewayDetails',
  });

  expect(ctx.outputs['gatewayDetails']).toBeTruthy();
  expect(ctx.outputs['gatewayDetails'].id).toBe('bacs');
});
