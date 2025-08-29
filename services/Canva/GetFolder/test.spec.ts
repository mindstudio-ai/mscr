import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves folder information and saves to output variable', async () => {
  // Mock the token environment variable
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      folder: {
        id: 'FAF2lZtloor',
        name: 'Test Folder',
        created_at: 1377396000,
        updated_at: 1692928800,
        thumbnail: {
          width: 595,
          height: 335,
          url: 'https://document-export.canva.com/test/thumbnail.png',
        },
      },
    }),
  });

  const ctx = await runConnector(handler, {
    folderId: 'FAF2lZtloor',
    outputVariable: 'folderInfo',
  });

  expect(ctx.outputs['folderInfo']).toBeTruthy();
  expect(ctx.outputs['folderInfo'].folder.name).toBe('Test Folder');
  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.canva.com/rest/v1/folders/FAF2lZtloor',
    expect.objectContaining({
      headers: expect.objectContaining({
        Authorization: 'Bearer test_token',
      }),
    }),
  );
});
