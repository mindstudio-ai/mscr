import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates update request', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    rowIds: '123,456',
    columnIds: '789,012',
    recipientEmails: 'user@example.com',
    subject: 'Update Request',
    message: 'Please update',
    outputVariable: 'request',
  });
  expect(ctx.outputs['request']).toBeTruthy();
});
