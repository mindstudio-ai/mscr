import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves refunds and saves to output variable', async () => {
  // Set environment variables
  process.env.url = 'https://example-store.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Mock global fetch
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      {
        id: 123,
        parent_id: 456,
        amount: '10.00',
        date_created: '2023-01-01T12:00:00',
      },
    ],
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    perPage: '10',
    page: '1',
    order: 'desc',
    outputVariable: 'refunds',
  });

  expect(ctx.outputs.refunds).toBeTruthy();
  expect(Array.isArray(ctx.outputs.refunds)).toBe(true);
  expect(global.fetch).toHaveBeenCalled();
});
