import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('get column', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheetId',
    columnId: 'test-columnId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
