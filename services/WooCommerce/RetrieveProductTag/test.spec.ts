import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves product tag and saves to output variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  const { handler } = await import('./handler.ts');

  // Mock a successful response
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 34,
      name: 'Leather Shoes',
      slug: 'leather-shoes',
      description: '',
      count: 0,
    }),
  });

  const ctx = await runConnector(handler, {
    tagId: '34',
    outputVariable: 'tagData',
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'https://example.com/wp-json/wc/v3/products/tags/34',
    expect.objectContaining({
      method: 'GET',
      headers: expect.any(Object),
    }),
  );

  expect(ctx.outputs.tagData).toBeDefined();
  expect(ctx.outputs.tagData.id).toBe(34);
  expect(ctx.outputs.tagData.name).toBe('Leather Shoes');
});
