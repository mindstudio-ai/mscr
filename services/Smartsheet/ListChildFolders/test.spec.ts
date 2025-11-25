import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists child folders', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    folderId: 'test-folder-id',
    outputVariable: 'folders',
  });
  expect(ctx.outputs['folders'].folders).toBeDefined();
});
