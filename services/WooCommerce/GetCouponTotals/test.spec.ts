import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves coupon totals', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'consumer_key';
  process.env.consumerSecret = 'consumer_secret';

  const { handler } = await import('./handler.ts');

  // Mock global fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      { slug: 'percent', name: 'Percentage discount', total: 2 },
      { slug: 'fixed_cart', name: 'Fixed cart discount', total: 1 },
    ],
  });

  const ctx = await runConnector(handler, {
    outputVariable: 'couponTotals',
  });

  expect(ctx.outputs['couponTotals']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['couponTotals'])).toBe(true);
  expect(ctx.outputs['couponTotals'].length).toBeGreaterThan(0);
});
