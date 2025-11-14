import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates a sheet in Smartsheet', async () => {
  // Mock environment variables
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    sheetName: 'Updated Sheet Name',
    outputVariable: 'updatedSheet',
  });

  // Verify output was set
  expect(ctx.outputs['updatedSheet']).toBeTruthy();
  expect(ctx.outputs['updatedSheet'].id).toBeDefined();
});
