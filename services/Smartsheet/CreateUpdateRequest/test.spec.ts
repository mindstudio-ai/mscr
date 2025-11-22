import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('create an update request', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheetId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
