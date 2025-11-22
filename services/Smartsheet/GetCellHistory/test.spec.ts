import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('list cell history', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheetId',
    rowId: 'test-rowId',
    columnId: 'test-columnId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
