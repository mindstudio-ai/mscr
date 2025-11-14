import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('imports csv to sheet', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    fileUrl: 'https://example.com/test.csv',
    sheetName: 'Imported CSV',
    outputVariable: 'sheet',
  });
  expect(ctx.outputs['sheet']).toBeTruthy();
});
