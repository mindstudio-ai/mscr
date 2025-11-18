import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists folders', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    folderId: 'test-folder-id',
    outputVariable: 'output',
  });
  expect(ctx.outputs['output']).toBeDefined();
});
