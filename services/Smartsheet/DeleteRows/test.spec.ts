import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes rows', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    rowIds: '123,456,789',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result'].success).toBe(true);
});
