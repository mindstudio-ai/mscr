import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('batch webhooks connector works', async () => {
  // Setup environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      create: [{ id: 146, name: 'Test webhook' }],
      delete: [{ id: 143, name: 'Deleted webhook' }],
    }),
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    createWebhooks: [
      {
        name: 'Test webhook',
        topic: 'order.created',
        delivery_url: 'https://example.com/webhook',
      },
    ],
    deleteWebhooks: '143',
    outputVariable: 'result',
  });

  expect(ctx.outputs.result).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
