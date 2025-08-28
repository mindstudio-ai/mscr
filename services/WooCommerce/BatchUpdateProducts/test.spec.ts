import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('batch update products', async () => {
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      create: [{ id: 801, name: 'Test Product', type: 'simple' }],
      update: [],
      delete: [],
    }),
  });

  const ctx = await runConnector(handler, {
    createProducts: [
      { name: 'Test Product', type: 'simple', regular_price: '19.99' },
    ],
    outputVariable: 'result',
  });

  expect(ctx.outputs.result).toBeTruthy();
  expect(ctx.outputs.result.create).toBeInstanceOf(Array);
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
