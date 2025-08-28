import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a product attribute and saves output', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock the API response
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 1,
          name: 'Color',
          slug: 'pa_color',
          type: 'select',
          order_by: 'menu_order',
          has_archives: true,
        }),
    }),
  );

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    attributeId: '1',
    force: 'true',
    outputVariable: 'deletedAttribute',
  });

  expect(ctx.outputs.deletedAttribute).toBeTruthy();
  expect(ctx.outputs.deletedAttribute.id).toBe(1);
  expect(ctx.outputs.deletedAttribute.name).toBe('Color');
});
