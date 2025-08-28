import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves sales report and saves to output variable', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      {
        total_sales: '100.00',
        net_sales: '90.00',
        total_orders: 5,
      },
    ],
  });

  const ctx = await runConnector(handler, {
    dateRangeType: 'period',
    period: 'week',
    outputVariable: 'salesReport',
  });

  expect(ctx.outputs['salesReport']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['salesReport'])).toBe(true);
  expect(ctx.outputs['salesReport'][0]).toHaveProperty('total_sales');
});
