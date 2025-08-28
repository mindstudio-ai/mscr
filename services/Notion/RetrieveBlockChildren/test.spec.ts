import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves block children and saves to output variable', async () => {
  // Mock environment variables
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');

  // Use a known block ID or URL for testing
  const ctx = await runConnector(handler, {
    blockIdOrUrl:
      process.env.NOTION_TEST_BLOCK_ID ||
      '59833787-2cf9-4fdf-8782-e53db20768a5',
    pageSize: '50',
    outputVariable: 'blockChildren',
  });

  expect(ctx.outputs.blockChildren).toBeTruthy();
  expect(ctx.outputs.blockChildren.object).toBe('list');
  expect(Array.isArray(ctx.outputs.blockChildren.results)).toBe(true);
});
