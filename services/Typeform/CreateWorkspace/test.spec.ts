import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a workspace and saves output', async () => {
  process.env.token = process.env.TYPEFORM_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    workspaceName: 'Test Workspace',
    outputVariable: 'workspaceData',
  });

  expect(ctx.outputs['workspaceData']).toBeTruthy();
  expect(ctx.outputs['workspaceData'].name).toBe('Test Workspace');
  expect(ctx.outputs['workspaceData'].id).toBeTruthy();
});
