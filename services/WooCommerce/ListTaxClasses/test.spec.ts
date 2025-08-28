import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves tax classes', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');

  // Mock WooCommerce API response
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            slug: 'standard',
            name: 'Standard Rate',
          },
          {
            slug: 'reduced-rate',
            name: 'Reduced Rate',
          },
        ]),
    }),
  );

  const ctx = await runConnector(handler, {
    outputVariable: 'taxClasses',
  });

  expect(ctx.outputs['taxClasses']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['taxClasses'])).toBe(true);
  expect(ctx.outputs['taxClasses'].length).toBeGreaterThan(0);
});
