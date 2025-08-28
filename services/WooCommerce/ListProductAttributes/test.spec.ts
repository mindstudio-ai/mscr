import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists product attributes', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => [
      {
        id: 1,
        name: 'Color',
        slug: 'pa_color',
        type: 'select',
        order_by: 'menu_order',
        has_archives: true,
      },
    ],
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    context: 'view',
    outputVariable: 'attributes',
  });

  expect(ctx.outputs.attributes).toBeTruthy();
  expect(Array.isArray(ctx.outputs.attributes)).toBe(true);
  expect(ctx.outputs.attributes[0].name).toBe('Color');

  // Verify fetch was called with correct parameters
  expect(fetch).toHaveBeenCalledWith(
    'https://example.com/wp-json/wc/v3/products/attributes?context=view',
    expect.objectContaining({
      method: 'GET',
      headers: expect.any(Object),
    }),
  );
});
