import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a workspace and saves output to variable', async () => {
  // Setup environment variables
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    accountId: 'test-account-id',
    workspaceName: 'Test Workspace',
    outputVariable: 'workspaceData',
  });

  expect(ctx.outputs['workspaceData']).toBeTruthy();
});
