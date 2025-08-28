import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates webhook and saves output to variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 142,
      name: 'Order updated',
      status: 'paused',
      topic: 'order.updated',
      resource: 'order',
      event: 'updated',
      delivery_url: 'https://example.com/webhook-receiver',
      date_created: '2023-01-01T12:00:00',
      date_modified: '2023-01-02T12:00:00',
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    webhookId: '142',
    status: 'paused',
    outputVariable: 'updatedWebhook',
  });

  expect(ctx.outputs.updatedWebhook).toBeTruthy();
  expect(ctx.outputs.updatedWebhook.id).toBe(142);
  expect(ctx.outputs.updatedWebhook.status).toBe('paused');
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
