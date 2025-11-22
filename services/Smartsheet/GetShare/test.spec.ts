import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('get sheet share.', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheetId',
    shareId: 'test-shareId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
