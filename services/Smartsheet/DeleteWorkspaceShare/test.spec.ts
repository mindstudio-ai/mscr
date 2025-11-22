import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('delete workspace share', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    workspaceId: 'test-workspaceId',
    shareId: 'test-shareId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
