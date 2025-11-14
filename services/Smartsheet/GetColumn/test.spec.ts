import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets column details', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    columnId: 'test-column-id',
    outputVariable: 'column',
  });
  expect(ctx.outputs['column']).toBeTruthy();
});
