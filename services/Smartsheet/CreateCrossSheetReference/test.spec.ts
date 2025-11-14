import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates cross-sheet reference', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    name: 'Test Reference',
    sourceSheetId: 'source-sheet-id',
    startRowId: '123',
    endRowId: '456',
    startColumnId: '789',
    endColumnId: '101112',
    outputVariable: 'reference',
  });
  expect(ctx.outputs['reference']).toBeTruthy();
});
