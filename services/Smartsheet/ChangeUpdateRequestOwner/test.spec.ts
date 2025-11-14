import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('changes update request owner', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    updateRequestId: 'test-request-id',
    newOwnerEmail: 'newowner@example.com',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
