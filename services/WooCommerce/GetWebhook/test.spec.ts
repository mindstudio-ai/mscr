import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves webhook details', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock global fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 142,
      name: 'Order updated',
      status: 'active',
      topic: 'order.updated',
      resource: 'order',
      event: 'updated',
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    webhookId: '142',
    outputVariable: 'webhookDetails',
  });

  expect(ctx.outputs['webhookDetails']).toBeTruthy();
  expect(ctx.outputs['webhookDetails'].id).toBe(142);
  expect(ctx.outputs['webhookDetails'].name).toBe('Order updated');
});
