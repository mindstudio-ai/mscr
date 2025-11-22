import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('delete group members', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    groupId: 'test-groupId',
    userId: 'test-userId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
