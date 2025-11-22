import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('delete group', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    groupId: 'test-groupId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
