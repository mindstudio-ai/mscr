import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds row attachment', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    rowId: 'test-row-id',
    attachmentType: 'LINK',
    url: 'https://example.com',
    outputVariable: 'attachment',
  });
  expect(ctx.outputs['attachment']).toBeTruthy();
});
