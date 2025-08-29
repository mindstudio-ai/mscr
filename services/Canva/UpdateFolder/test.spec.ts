import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates folder and saves output to variable', async () => {
  // Set up mock environment
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      folder: {
        id: 'FAF2lZtloor',
        name: 'Updated Folder Name',
        created_at: 1377396000,
        updated_at: 1692928800,
        thumbnail: {
          width: 595,
          height: 335,
          url: 'https://document-export.canva.com/Vczz9/zF9vzVtdADc/2/thumbnail/0001.png?',
        },
      },
    }),
  });

  const ctx = await runConnector(handler, {
    folderId: 'FAF2lZtloor',
    folderName: 'Updated Folder Name',
    outputVariable: 'updatedFolder',
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.canva.com/rest/v1/folders/FAF2lZtloor',
    expect.objectContaining({
      method: 'PATCH',
      headers: expect.objectContaining({
        Authorization: 'Bearer mock_token',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ name: 'Updated Folder Name' }),
    }),
  );

  expect(ctx.outputs.updatedFolder).toBeTruthy();
  expect(ctx.outputs.updatedFolder.folder.name).toBe('Updated Folder Name');
});
