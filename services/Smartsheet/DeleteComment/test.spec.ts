import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes comment', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    commentId: 'test-comment-id',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result'].success).toBe(true);
});
