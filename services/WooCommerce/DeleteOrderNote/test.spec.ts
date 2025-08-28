import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes order note and saves output', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock the WooCommerce API response
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 281,
          author: 'system',
          date_created: '2017-03-21T16:46:41',
          date_created_gmt: '2017-03-21T19:46:41',
          note: 'Order ok!!!',
          customer_note: false,
        }),
    }),
  );

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    orderId: '723',
    noteId: '281',
    force: 'true',
    outputVariable: 'deletedNote',
  });

  expect(ctx.outputs.deletedNote).toBeTruthy();
  expect(ctx.outputs.deletedNote.id).toBe(281);
});
