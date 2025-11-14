import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds attachment to sheet', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    attachmentType: 'LINK',
    url: 'https://example.com',
    outputVariable: 'attachment',
  });
  expect(ctx.outputs['attachment']).toBeTruthy();
});
