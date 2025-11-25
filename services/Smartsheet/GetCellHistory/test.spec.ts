import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets cell history', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    rowId: 'test-row-id',
    columnId: 'test-column-id',
    outputVariable: 'history',
  });
  expect(ctx.outputs['history'].history).toBeDefined();
});
