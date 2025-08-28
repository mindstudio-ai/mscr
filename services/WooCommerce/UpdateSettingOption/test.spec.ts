import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates a WooCommerce setting option', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    groupId: 'general',
    settingId: 'woocommerce_allowed_countries',
    value: 'all_except',
    outputVariable: 'updatedSetting',
  });

  expect(ctx.outputs['updatedSetting']).toBeTruthy();
});
