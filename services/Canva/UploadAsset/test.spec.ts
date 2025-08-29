import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import fs from 'fs';
import path from 'path';

test('uploads asset to Canva', async () => {
  // Set up environment variables
  process.env.token = 'test-token';

  // Create a temporary test file
  const testFilePath = path.join(__dirname, 'test-image.png');

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          job: {
            id: 'test-job-id',
            status: 'success',
            asset: {
              id: 'Msd59349ff',
              name: 'Test Image',
              created_at: 1377396000,
              updated_at: 1692928800,
            },
          },
        }),
    }),
  );

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    assetName: 'Test Image',
    filePath: testFilePath,
    outputVariable: 'uploadedAsset',
  });

  expect(ctx.outputs['uploadedAsset']).toBeTruthy();
  expect(ctx.outputs['uploadedAsset'].id).toBe('Msd59349ff');

  // Clean up mock
  vi.restoreAllMocks();
});
