import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a folder in Canva', async () => {
  process.env.token = process.env.CANVA_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    folderName: 'Test Folder',
    parentFolderId: 'root',
    outputVariable: 'folderInfo',
  });

  expect(ctx.outputs['folderInfo']).toBeTruthy();
});
