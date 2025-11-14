import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists proof request versions', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    proofRequestId: 'test-proof-id',
    outputVariable: 'versions',
  });
  expect(ctx.outputs['versions'].versions).toBeDefined();
});
