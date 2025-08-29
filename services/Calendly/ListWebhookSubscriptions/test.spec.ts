import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists webhook subscriptions', async () => {
  // Set up environment variables
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      collection: [
        {
          uri: 'https://api.calendly.com/webhook_subscriptions/123',
          callback_url: 'https://example.com/callback',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          state: 'active',
          events: ['invitee.created'],
        },
      ],
      pagination: {
        next_page_token: null,
        previous_page_token: null,
        count: 1,
      },
    }),
  });

  const ctx = await runConnector(handler, {
    organizationUrl: 'https://api.calendly.com/organizations/ABC123',
    count: '10',
    outputVariable: 'webhooks',
  });

  expect(ctx.outputs.webhooks).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringContaining('https://api.calendly.com/webhook_subscriptions'),
    expect.objectContaining({
      method: 'GET',
      headers: expect.objectContaining({
        Authorization: 'Bearer mock_token',
      }),
    }),
  );
});
