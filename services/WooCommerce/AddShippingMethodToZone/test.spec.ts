import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds shipping method to zone', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');

  // Mock the WooCommerce API response
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          instance_id: 26,
          title: 'Flat rate',
          method_id: 'flat_rate',
          enabled: true,
        }),
    }),
  );

  const ctx = await runConnector(handler, {
    zoneId: '5',
    methodId: 'flat_rate',
    outputVariable: 'shippingMethod',
  });

  expect(ctx.outputs.shippingMethod).toBeTruthy();
  expect(ctx.outputs.shippingMethod.instance_id).toBe(26);
  expect(ctx.outputs.shippingMethod.method_id).toBe('flat_rate');
});
