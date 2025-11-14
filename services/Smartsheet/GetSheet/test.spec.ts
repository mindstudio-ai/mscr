import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets a specific sheet from Smartsheet', async () => {
  // Mock environment variables
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    outputVariable: 'sheetDetails',
  });

  // Verify output was set
  expect(ctx.outputs['sheetDetails']).toBeTruthy();
  expect(ctx.outputs['sheetDetails'].id).toBeDefined();
});
