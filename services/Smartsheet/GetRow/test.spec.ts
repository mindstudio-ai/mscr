import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets a specific row from a Smartsheet', async () => {
  // Mock environment variables
  process.env.accessToken = process.env.accessToken;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    rowId: '1234567890',
    outputVariable: 'rowDetails',
  });

  // Verify output was set
  expect(ctx.outputs['rowDetails']).toBeTruthy();
  expect(ctx.outputs['rowDetails'].id).toBeDefined();
});
