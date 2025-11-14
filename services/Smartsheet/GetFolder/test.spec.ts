import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets folder', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    folderId: 'test-folder-id',
    outputVariable: 'folder',
  });
  expect(ctx.outputs['folder']).toBeTruthy();
});
