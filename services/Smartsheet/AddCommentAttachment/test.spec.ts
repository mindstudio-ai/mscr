import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds comment attachment', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    commentId: 'test-comment-id',
    filePath: '/path/to/file.pdf',
    outputVariable: 'attachment',
  });
  expect(ctx.outputs['attachment']).toBeTruthy();
});
