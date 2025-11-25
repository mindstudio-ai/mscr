import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('GetWorkspaceShare executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    workspaceId: 'workspaceId-sample',
    shareId: 'shareId-sample',
    accessapilevel: 1,
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});
