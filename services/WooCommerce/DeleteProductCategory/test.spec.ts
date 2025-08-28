import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a product category', async () => {
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
          id: 9,
          name: 'Clothing',
          slug: 'clothing',
          parent: 0,
          description: 'All kinds of clothes.',
        }),
    }),
  );

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    categoryId: '9',
    force: 'true',
    outputVariable: 'deletedCategory',
  });

  expect(ctx.outputs['deletedCategory']).toBeTruthy();
  expect(ctx.outputs['deletedCategory'].id).toBe(9);
});
