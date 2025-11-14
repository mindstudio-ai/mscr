import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists folders', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    workspaceId: 'test-workspace-id',
    outputVariable: 'folders',
  });
  expect(ctx.outputs['folders'].folders).toBeDefined();
});
