import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists proofs', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    outputVariable: 'proofs',
  });
  expect(ctx.outputs['proofs'].proofs).toBeDefined();
});
