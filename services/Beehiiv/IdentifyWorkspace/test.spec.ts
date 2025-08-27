import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('identifies workspace and saves to output variable', async () => {
  // Set up environment variable
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'workspaceInfo',
  });

  // Verify the output exists and has expected structure
  expect(ctx.outputs['workspaceInfo']).toBeTruthy();
  expect(ctx.outputs['workspaceInfo']).toHaveProperty('id');
  expect(ctx.outputs['workspaceInfo']).toHaveProperty('name');
  expect(ctx.outputs['workspaceInfo']).toHaveProperty('ownerEmail');
});
