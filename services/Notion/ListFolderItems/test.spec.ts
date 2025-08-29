import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists folder items and saves to output variable', async () => {
  // Mock environment variables
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to return a successful response
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      items: [
        {
          type: 'folder',
          folder: {
            id: 'FAF2lZtloor',
            name: 'Test Folder',
            created_at: 1377396000,
            updated_at: 1692928800,
          },
        },
        {
          type: 'design',
          design: {
            id: 'DAFVztcvd9z',
            title: 'Test Design',
            created_at: 1377396000,
            updated_at: 1692928800,
          },
        },
      ],
    }),
  });

  const ctx = await runConnector(handler, {
    folderId: 'test-folder-id',
    filterType: 'design,folder',
    sortBy: 'modified_descending',
    outputVariable: 'folderContents',
  });

  expect(ctx.outputs.folderContents).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringContaining(
      'https://api.canva.com/rest/v1/folders/test-folder-id/items',
    ),
    expect.objectContaining({
      method: 'GET',
      headers: expect.objectContaining({
        Authorization: 'Bearer mock-token',
      }),
    }),
  );
});
