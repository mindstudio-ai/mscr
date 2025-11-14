import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds discussion comment', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    discussionId: 'test-discussion-id',
    text: 'Test comment',
    outputVariable: 'comment',
  });
  expect(ctx.outputs['comment']).toBeTruthy();
});
