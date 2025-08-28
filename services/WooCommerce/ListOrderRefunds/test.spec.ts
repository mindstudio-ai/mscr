import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists order refunds', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');

  // Mock the WooCommerce API response
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 726,
            date_created: '2023-03-21T17:07:11',
            amount: '10.00',
            reason: 'Customer request',
          },
        ]),
    }),
  );

  const ctx = await runConnector(handler, {
    orderId: '123',
    page: '1',
    perPage: '10',
    outputVariable: 'refunds',
  });

  expect(ctx.outputs.refunds).toBeTruthy();
  expect(Array.isArray(ctx.outputs.refunds)).toBe(true);
});
