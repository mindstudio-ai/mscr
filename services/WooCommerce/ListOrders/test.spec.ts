import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists orders and saves to output variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      { id: 1, status: 'processing', total: '100.00' },
      { id: 2, status: 'completed', total: '75.50' },
    ],
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    status: 'processing',
    page: '1',
    perPage: '10',
    order: 'desc',
    orderby: 'date',
    outputVariable: 'orders',
  });

  expect(ctx.outputs.orders).toBeTruthy();
  expect(Array.isArray(ctx.outputs.orders)).toBe(true);
  expect(global.fetch).toHaveBeenCalled();
});
