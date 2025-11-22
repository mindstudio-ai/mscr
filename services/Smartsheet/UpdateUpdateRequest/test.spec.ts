import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('update an update request', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheetId',
    updateRequestId: 'test-updateRequestId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
