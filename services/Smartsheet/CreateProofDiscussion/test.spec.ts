import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('create proof discussion', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheetId',
    proofId: 'test-proofId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
