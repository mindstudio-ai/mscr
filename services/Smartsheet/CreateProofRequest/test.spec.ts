import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates proof request', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    rowId: 'test-row-id',
    attachmentId: 'test-attachment-id',
    approverEmails: 'approver1@example.com,approver2@example.com',
    message: 'Please review',
    outputVariable: 'proof',
  });
  expect(ctx.outputs['proof']).toBeTruthy();
});
