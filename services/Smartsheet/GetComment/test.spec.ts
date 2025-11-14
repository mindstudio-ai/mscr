import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets comment details', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    commentId: 'test-comment-id',
    outputVariable: 'comment',
  });
  expect(ctx.outputs['comment']).toBeTruthy();
});
