import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists product variations', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      {
        id: 101,
        sku: 'VAR-001',
        price: '19.99',
        attributes: [{ name: 'Color', option: 'Red' }],
      },
      {
        id: 102,
        sku: 'VAR-002',
        price: '24.99',
        attributes: [{ name: 'Color', option: 'Blue' }],
      },
    ],
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    productId: '123',
    perPage: '10',
    page: '1',
    outputVariable: 'variations',
  });

  expect(ctx.outputs.variations).toBeTruthy();
  expect(Array.isArray(ctx.outputs.variations)).toBe(true);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringContaining('/wp-json/wc/v3/products/123/variations'),
    expect.objectContaining({
      method: 'GET',
      headers: expect.any(Object),
    }),
  );
});
