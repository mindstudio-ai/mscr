import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes workspace successfully', async () => {
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    status: 204,
    ok: true,
  });

  const ctx = await runConnector(handler, {
    workspaceId: 'test-workspace-id',
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.typeform.com/workspaces/test-workspace-id',
    expect.objectContaining({
      method: 'DELETE',
      headers: expect.objectContaining({
        Authorization: 'Bearer mock-token',
      }),
    }),
  );
});
