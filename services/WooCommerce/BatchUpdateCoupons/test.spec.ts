import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('batch update coupons', async () => {
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      create: [{ id: 123, code: 'newcoupon' }],
      update: [{ id: 456, code: 'updatedcoupon' }],
      delete: [{ id: 789 }],
    }),
  });

  const ctx = await runConnector(handler, {
    createCoupons: [
      { code: 'newcoupon', discount_type: 'percent', amount: '20' },
    ],
    updateCoupons: [{ id: 456, code: 'updatedcoupon' }],
    deleteCoupons: [789],
    outputVariable: 'result',
  });

  expect(ctx.outputs.result).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
