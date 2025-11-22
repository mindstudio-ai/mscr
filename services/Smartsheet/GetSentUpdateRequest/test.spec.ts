import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('get sent update request', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheetId',
    sentUpdateRequestId: 'test-sentUpdateRequestId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
