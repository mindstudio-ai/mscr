import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves order note and saves to output variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API call during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 281,
      author: 'system',
      date_created: '2017-03-21T16:46:41',
      note: 'Order ok!!!',
      customer_note: false,
    }),
  });

  const ctx = await runConnector(handler, {
    orderId: '723',
    noteId: '281',
    outputVariable: 'orderNote',
  });

  expect(ctx.outputs['orderNote']).toBeTruthy();
  expect(ctx.outputs['orderNote'].id).toBe(281);
  expect(ctx.outputs['orderNote'].note).toBe('Order ok!!!');
});
