import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves product attribute term', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');

  // Mock WooCommerce API response
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 23,
          name: 'Large',
          slug: 'large',
          description: 'Large size',
          menu_order: 0,
          count: 5,
        }),
    }),
  );

  const ctx = await runConnector(handler, {
    attributeId: '1',
    termId: '23',
    outputVariable: 'termData',
  });

  expect(ctx.outputs['termData']).toBeTruthy();
  expect(ctx.outputs['termData'].id).toBe(23);
  expect(ctx.outputs['termData'].name).toBe('Large');
});
