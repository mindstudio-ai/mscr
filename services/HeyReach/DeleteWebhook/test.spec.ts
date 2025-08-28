import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes webhook successfully', async () => {
  // Set up environment variables
  process.env.apiKey = process.env.HEYREACH_API_KEY || 'test-api-key';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API call during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({}),
    text: async () => '',
  });

  // Run the connector with test inputs
  await runConnector(handler, {
    webhookId: '1234',
  });

  // Verify fetch was called with correct parameters
  expect(fetch).toHaveBeenCalledWith(
    'https://api.heyreach.io/api/public/webhooks/DeleteWebhook?webhookId=1234',
    expect.objectContaining({
      method: 'DELETE',
      headers: expect.objectContaining({
        'X-API-KEY': process.env.apiKey,
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      }),
    }),
  );
});
