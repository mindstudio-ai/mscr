import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates folder', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    folderId: 'test-folder-id',
    name: 'Updated Name',
    outputVariable: 'folder',
  });
  expect(ctx.outputs['folder']).toBeTruthy();
});
