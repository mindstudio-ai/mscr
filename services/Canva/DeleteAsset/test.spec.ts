import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes an asset successfully', async () => {
  // Set up the environment variable for authentication
  process.env.token = 'test-token';

  // Mock fetch to return a successful response
  global.fetch = vi.fn().mockResolvedValue({
    status: 204,
    ok: true,
  });

  const { handler } = await import('./handler.ts');

  // Run the connector with test input
  const ctx = await runConnector(handler, {
    assetId: 'test-asset-id',
  });

  // Verify fetch was called correctly
  expect(fetch).toHaveBeenCalledWith(
    'https://api.canva.com/rest/v1/assets/test-asset-id',
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer test-token',
      },
    },
  );
});
