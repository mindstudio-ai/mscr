import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a folder successfully', async () => {
  // Set up mock environment
  process.env.token = 'mock-token';

  // Mock fetch to return a successful response
  global.fetch = vi.fn().mockResolvedValue({
    status: 204,
    ok: true,
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    folderId: 'mock-folder-id',
  });

  // Verify fetch was called with correct parameters
  expect(fetch).toHaveBeenCalledWith(
    'https://api.canva.com/rest/v1/folders/mock-folder-id',
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer mock-token',
      },
    },
  );

  // No outputs expected for this connector
  expect(Object.keys(ctx.outputs).length).toBe(0);
});
