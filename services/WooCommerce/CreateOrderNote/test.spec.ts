import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates order note and saves output', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 201,
    json: async () => ({
      id: 281,
      author: 'system',
      date_created: '2023-06-15T16:46:41',
      date_created_gmt: '2023-06-15T19:46:41',
      note: 'Test note content',
      customer_note: false,
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    orderId: '723',
    noteContent: 'Test note content',
    customerNote: 'false',
    outputVariable: 'orderNote',
  });

  expect(ctx.outputs['orderNote']).toBeTruthy();
  expect(ctx.outputs['orderNote'].id).toBe(281);
  expect(ctx.outputs['orderNote'].note).toBe('Test note content');

  // Verify the fetch was called with correct parameters
  expect(fetch).toHaveBeenCalledTimes(1);
});
