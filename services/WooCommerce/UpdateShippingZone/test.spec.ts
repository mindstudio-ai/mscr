import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates shipping zone and saves output', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock the WooCommerce API response
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 5,
          name: 'Brazil',
          order: 1,
          _links: {
            self: [
              { href: 'https://example.com/wp-json/wc/v3/shipping/zones/5' },
            ],
            collection: [
              { href: 'https://example.com/wp-json/wc/v3/shipping/zones' },
            ],
          },
        }),
    }),
  );

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    zoneId: '5',
    order: '1',
    outputVariable: 'updatedZone',
  });

  expect(ctx.outputs.updatedZone).toBeTruthy();
  expect(ctx.outputs.updatedZone.id).toBe(5);
  expect(ctx.outputs.updatedZone.order).toBe(1);
});
