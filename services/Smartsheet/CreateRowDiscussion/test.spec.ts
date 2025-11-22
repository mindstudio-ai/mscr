import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('create a discussion on a row', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheetId',
    rowId: 'test-rowId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
