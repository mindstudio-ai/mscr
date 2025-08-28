import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists comments from a Notion block', async () => {
  // Mock the environment variable
  process.env.token = process.env.NOTION_API_KEY;

  const { handler } = await import('./handler.ts');

  // Use a test block ID - this should be a valid Notion block ID for testing
  const ctx = await runConnector(handler, {
    blockId: 'test-block-id-or-url',
    pageSize: '10',
    outputVariable: 'comments',
  });

  expect(ctx.outputs['comments']).toBeTruthy();
  expect(ctx.outputs['comments'].results).toBeDefined();
});
