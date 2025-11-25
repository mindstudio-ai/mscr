import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets update request', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    updateRequestId: 'test-request-id',
    outputVariable: 'request',
  });
  expect(ctx.outputs['request']).toBeTruthy();
});
