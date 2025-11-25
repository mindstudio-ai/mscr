import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('sends rows', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    rowIds: '123,456',
    recipientEmails: 'user@example.com',
    subject: 'Row Data',
    message: 'Please review',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
