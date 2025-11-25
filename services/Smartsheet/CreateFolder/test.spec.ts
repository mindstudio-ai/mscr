import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates folder', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    parentType: 'workspace',
    parentId: 'test-workspace-id',
    name: 'Test Folder',
    outputVariable: 'folder',
  });
  expect(ctx.outputs['folder']).toBeTruthy();
});
