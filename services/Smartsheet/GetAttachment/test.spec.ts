import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets attachment details', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    attachmentId: 'test-attachment-id',
    outputVariable: 'attachment',
  });
  expect(ctx.outputs['attachment']).toBeTruthy();
});
