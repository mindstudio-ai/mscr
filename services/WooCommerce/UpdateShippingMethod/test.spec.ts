import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates shipping method and saves output', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Mock WooCommerce API response
  global.fetch = vi.fn().mockImplementation((url, options) => {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          instance_id: 26,
          title: 'Updated Flat Rate',
          enabled: true,
          method_id: 'flat_rate',
          settings: {
            cost: { value: '20.00' },
          },
        }),
    });
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    zoneId: '5',
    methodId: '26',
    title: 'Updated Flat Rate',
    cost: '20.00',
    enabled: 'true',
    outputVariable: 'updatedMethod',
  });

  expect(ctx.outputs['updatedMethod']).toBeTruthy();
  expect(global.fetch).toHaveBeenCalled();
});
