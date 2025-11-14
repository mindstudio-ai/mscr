import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('imports xlsx to sheet', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    fileUrl: 'https://example.com/test.xlsx',
    sheetName: 'Imported Sheet',
    outputVariable: 'sheet',
  });
  expect(ctx.outputs['sheet']).toBeTruthy();
});
