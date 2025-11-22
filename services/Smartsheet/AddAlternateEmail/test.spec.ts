import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('add alternate emails', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    userId: 'test-userId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
