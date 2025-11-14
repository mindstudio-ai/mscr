import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds a column to a Smartsheet', async () => {
  // Mock environment variables
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    columnTitle: 'Test Column',
    columnType: 'TEXT_NUMBER',
    outputVariable: 'newColumn',
  });

  // Verify output was set
  expect(ctx.outputs['newColumn']).toBeTruthy();
  expect(ctx.outputs['newColumn'].id).toBeDefined();
});
