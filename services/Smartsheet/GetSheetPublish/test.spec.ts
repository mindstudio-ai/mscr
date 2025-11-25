import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets sheet publish status', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    outputVariable: 'status',
  });
  expect(ctx.outputs['status']).toBeTruthy();
});
