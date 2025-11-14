import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('sends sheet', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    recipientEmails: 'user@example.com',
    subject: 'Sheet Update',
    message: 'Please review',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
