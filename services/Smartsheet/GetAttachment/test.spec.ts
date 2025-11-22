import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('get attachment', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheetId',
    attachmentId: 'test-attachmentId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
