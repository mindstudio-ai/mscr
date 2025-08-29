import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves workspace information', async () => {
  // Mock environment variables
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 'test-workspace-id',
      name: 'Test Workspace',
      forms: {
        count: 5,
        href: 'https://api.typeform.com/forms?workspace_id=test-workspace-id',
      },
      self: {
        href: 'https://api.typeform.com/workspaces/test-workspace-id',
      },
      shared: false,
      members: [],
    }),
  });

  const ctx = await runConnector(handler, {
    workspaceId: 'test-workspace-id',
    outputVariable: 'workspaceData',
  });

  expect(ctx.outputs.workspaceData).toBeTruthy();
  expect(ctx.outputs.workspaceData.id).toBe('test-workspace-id');
  expect(ctx.outputs.workspaceData.name).toBe('Test Workspace');
  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.typeform.com/workspaces/test-workspace-id',
    expect.objectContaining({
      method: 'GET',
      headers: expect.objectContaining({
        Authorization: 'Bearer mock-token',
      }),
    }),
  );
});
