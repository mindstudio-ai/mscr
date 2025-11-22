import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('get workspace', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    workspaceId: 'test-workspaceId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
