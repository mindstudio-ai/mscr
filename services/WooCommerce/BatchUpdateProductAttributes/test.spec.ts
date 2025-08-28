import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('batch update product attributes', async () => {
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      create: [{ id: 7, name: 'Brand' }],
      update: [{ id: 2, name: 'Size', order_by: 'name' }],
      delete: [{ id: 1, name: 'Color' }],
    }),
  });

  const ctx = await runConnector(handler, {
    attributesToCreate: [{ name: 'Brand' }],
    attributesToUpdate: [{ id: 2, order_by: 'name' }],
    attributesToDelete: [1],
    outputVariable: 'result',
  });

  expect(ctx.outputs.result).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
