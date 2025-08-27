import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves webhook and saves to output variable', async () => {
  // Set up environment variables
  process.env.apiKey = 'test-api-key';

  const { handler } = await import('./handler.ts');

  // Mock fetch to return a successful response
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      data: {
        id: 'ep_0ca1a8505a64924059c391744d0',
        url: 'https://example.com/webhook',
        created: 1666800076,
        updated: 1666800076,
        event_types: ['post.sent', 'subscription.confirmed'],
        description:
          'A webhook to receive new posts data and new subscription confirmations.',
      },
    }),
  });

  const ctx = await runConnector(handler, {
    publicationId: 'pub_12345',
    endpointId: 'ep_67890',
    outputVariable: 'webhookData',
  });

  expect(ctx.outputs['webhookData']).toBeTruthy();
  expect(ctx.outputs['webhookData'].id).toBe('ep_0ca1a8505a64924059c391744d0');
});
