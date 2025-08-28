import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates a product category and saves output', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      id: 9,
      name: 'Clothing',
      description: 'Updated description',
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    categoryId: '9',
    description: 'Updated description',
    outputVariable: 'updatedCategory',
  });

  expect(ctx.outputs.updatedCategory).toBeTruthy();
  expect(ctx.outputs.updatedCategory.id).toBe(9);
  expect(ctx.outputs.updatedCategory.description).toBe('Updated description');
});
