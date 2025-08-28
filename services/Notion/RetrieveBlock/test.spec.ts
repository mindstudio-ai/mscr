import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves a block from Notion', async () => {
  // Set up environment variables
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');

  // Use a valid block ID for testing
  // This assumes you have a valid block ID in your Notion workspace
  const ctx = await runConnector(handler, {
    blockIdOrUrl:
      process.env.TEST_NOTION_BLOCK_ID ||
      'c02fc1d3-db8b-45c5-a222-27595b15aea7',
    outputVariable: 'blockData',
  });

  // Verify the output was set
  expect(ctx.outputs['blockData']).toBeTruthy();
  expect(ctx.outputs['blockData'].object).toBe('block');
  expect(ctx.outputs['blockData'].id).toBeTruthy();
});

test('extracts block ID from URL', async () => {
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');

  // Use a URL format with a block ID
  const ctx = await runConnector(handler, {
    blockIdOrUrl:
      'https://www.notion.so/workspace/c02fc1d3db8b45c5a22227595b15aea7',
    outputVariable: 'blockData',
  });

  // Verify the output was set
  expect(ctx.outputs['blockData']).toBeTruthy();
  expect(ctx.outputs['blockData'].object).toBe('block');
});
