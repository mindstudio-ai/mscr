import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates update request', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    updateRequestId: 'test-request-id',
    subject: 'Updated Subject',
    outputVariable: 'request',
  });
  expect(ctx.outputs['request']).toBeTruthy();
});
