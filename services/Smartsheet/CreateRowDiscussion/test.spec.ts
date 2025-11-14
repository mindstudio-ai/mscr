import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates row discussion', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    rowId: 'test-row-id',
    title: 'Row Discussion',
    commentText: 'Row comment',
    outputVariable: 'discussion',
  });
  expect(ctx.outputs['discussion']).toBeTruthy();
});
