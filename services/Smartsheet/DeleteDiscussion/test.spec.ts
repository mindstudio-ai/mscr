import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('delete a discussion', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheetId',
    discussionId: 'test-discussionId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
