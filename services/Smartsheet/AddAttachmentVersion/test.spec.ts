import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds attachment version', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    attachmentId: 'test-attachment-id',
    filePath: '/path/to/file.pdf',
    outputVariable: 'newVersion',
  });
  expect(ctx.outputs['newVersion']).toBeTruthy();
});
