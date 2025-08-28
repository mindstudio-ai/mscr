import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves WooCommerce setting option', async () => {
  // Set up environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    groupId: 'general',
    settingId: 'woocommerce_allowed_countries',
    outputVariable: 'settingData',
  });

  expect(ctx.outputs['settingData']).toBeTruthy();
  expect(ctx.outputs['settingData'].id).toBe('woocommerce_allowed_countries');
});
