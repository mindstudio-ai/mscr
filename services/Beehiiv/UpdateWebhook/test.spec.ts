import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates webhook and saves output to variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  // Import handler
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
        description: 'Updated webhook description',
      },
    }),
  });

  // Run connector
  const ctx = await runConnector(handler, {
    publicationId: 'pub_12345678-1234-1234-1234-123456789012',
    endpointId: 'ep_12345678901234567890',
    eventTypes: ['post.sent', 'subscription.confirmed'],
    description: 'Updated webhook description',
    outputVariable: 'updatedWebhook',
  });

  // Verify output was set
  expect(ctx.outputs.updatedWebhook).toBeTruthy();
  expect(ctx.outputs.updatedWebhook.id).toBe('ep_0ca1a8505a64924059c391744d0');
});
