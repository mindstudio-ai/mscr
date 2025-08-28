import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a webhook and saves output', async () => {
  // Set environment variables
  process.env.url = 'https://example-store.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      id: 142,
      name: 'Order updated',
      status: 'active',
      topic: 'order.updated',
      delivery_url: 'https://webhook.site/test-endpoint',
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    name: 'Order updated',
    topic: 'order.updated',
    deliveryUrl: 'https://webhook.site/test-endpoint',
    secret: 'test-secret',
    outputVariable: 'webhookData',
  });

  expect(ctx.outputs['webhookData']).toBeTruthy();
  expect(ctx.outputs['webhookData'].id).toBe(142);
  expect(ctx.outputs['webhookData'].topic).toBe('order.updated');
});
