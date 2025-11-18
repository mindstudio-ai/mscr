import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('DeleteWorkspaceShare executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    workspaceId: 'workspaceId-sample',
    shareId: 'shareId-sample',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});
