import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes webhook successfully', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API call
  global.fetch = vi.fn().mockResolvedValue({
    status: 204,
    ok: true,
    json: async () => ({}),
  });

  const ctx = await runConnector(handler, {
    publicationId: 'pub_12345678-1234-1234-1234-123456789012',
    endpointId: 'ep_12345678901234567890',
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.beehiiv.com/v2/publications/pub_12345678-1234-1234-1234-123456789012/webhooks/ep_12345678901234567890',
    expect.objectContaining({
      method: 'DELETE',
      headers: expect.objectContaining({
        Authorization: expect.stringContaining('Bearer'),
      }),
    }),
  );
});
