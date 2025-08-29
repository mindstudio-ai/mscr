import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates workspace successfully', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    status: 204,
    ok: true,
  });

  const ctx = await runConnector(handler, {
    workspaceId: 'test-workspace-id',
    updateName: 'New Workspace Name',
    addMemberEmail: 'test@example.com',
    memberRole: 'editor',
    removeMemberEmail: 'remove@example.com',
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.typeform.com/workspaces/test-workspace-id',
    expect.objectContaining({
      method: 'PATCH',
      headers: expect.objectContaining({
        Authorization: 'Bearer test-token',
        'Content-Type': 'application/json',
      }),
    }),
  );

  expect(ctx.outputs.success).toBe(true);
});
