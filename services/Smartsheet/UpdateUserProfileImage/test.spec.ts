import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('update user profile image', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    userId: 'test-userId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
