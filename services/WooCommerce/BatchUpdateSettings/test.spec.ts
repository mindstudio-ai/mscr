import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates WooCommerce settings and saves output', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () =>
      Promise.resolve({
        update: [
          { id: 'woocommerce_currency', value: 'USD' },
          { id: 'woocommerce_demo_store', value: 'yes' },
        ],
      }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    groupId: 'general',
    settings: [
      { id: 'woocommerce_currency', value: 'USD' },
      { id: 'woocommerce_demo_store', value: 'yes' },
    ],
    outputVariable: 'updatedSettings',
  });

  expect(ctx.outputs.updatedSettings).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
