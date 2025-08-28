import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a webhook and saves output', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch response
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 142,
      name: 'Order updated',
      status: 'paused',
      topic: 'order.updated',
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    webhookId: '142',
    forceDelete: 'true',
    outputVariable: 'deletedWebhook',
  });

  expect(ctx.outputs['deletedWebhook']).toBeTruthy();
  expect(ctx.outputs['deletedWebhook'].id).toBe(142);
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringContaining('/wp-json/wc/v3/webhooks/142?force=true'),
    expect.objectContaining({
      method: 'DELETE',
    }),
  );
});
