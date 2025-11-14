import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets proof', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    proofRequestId: 'test-proof-id',
    outputVariable: 'proof',
  });
  expect(ctx.outputs['proof']).toBeTruthy();
});
