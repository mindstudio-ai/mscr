import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists system status tools', async () => {
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
        Promise.resolve([
          {
            id: 'clear_transients',
            name: 'WC transients',
            action: 'Clear transients',
            description:
              'This tool will clear the product/shop transients cache.',
          },
        ]),
    }),
  );

  const ctx = await runConnector(handler, {
    outputVariable: 'toolsList',
  });

  expect(ctx.outputs.toolsList).toBeTruthy();
  expect(Array.isArray(ctx.outputs.toolsList)).toBe(true);
  expect(ctx.outputs.toolsList[0]).toHaveProperty('id');
  expect(ctx.outputs.toolsList[0]).toHaveProperty('name');
});
