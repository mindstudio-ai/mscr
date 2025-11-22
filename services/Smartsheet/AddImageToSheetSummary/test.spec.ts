import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('add image to sheet summary', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheetId',
    fieldId: 'test-fieldId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
