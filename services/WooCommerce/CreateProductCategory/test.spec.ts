import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a WooCommerce product category', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      id: 123,
      name: 'Test Category',
      slug: 'test-category',
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    name: 'Test Category',
    description: 'A test category',
    display: 'default',
    imageSrc: 'https://example.com/image.jpg',
    outputVariable: 'categoryData',
  });

  expect(ctx.outputs.categoryData).toBeTruthy();
  expect(ctx.outputs.categoryData.id).toBe(123);
  expect(ctx.outputs.categoryData.name).toBe('Test Category');
});
