import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('batch update product categories', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      create: [{ id: 15, name: 'New Category' }],
      update: [{ id: 10, name: 'Updated Category' }],
      delete: [{ id: 11, name: 'Deleted Category' }],
    }),
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    createCategories: [{ name: 'New Category' }],
    updateCategories: [{ id: 10, name: 'Updated Category' }],
    deleteCategories: '11',
    outputVariable: 'result',
  });

  expect(ctx.outputs.result).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
