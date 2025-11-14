import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists all sheets from Smartsheet', async () => {
  // Mock environment variables
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    outputVariable: 'sheetList',
  });

  // Verify output was set
  expect(ctx.outputs['sheetList']).toBeTruthy();
  expect(ctx.outputs['sheetList'].sheets).toBeDefined();
});
