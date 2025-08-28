import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a Notion block', async () => {
  // Mock environment variables
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');

  // Use a test block ID - this would need to be a valid block ID in your Notion workspace
  const testBlockId =
    process.env.TEST_NOTION_BLOCK_ID || '7985540b-2e77-4ac6-8615-c3047e36f872';

  const ctx = await runConnector(handler, {
    blockId: testBlockId,
    outputVariable: 'deletedBlock',
  });

  // Check that the output was set
  expect(ctx.outputs.deletedBlock).toBeTruthy();
  // Verify the archived property is true
  expect(ctx.outputs.deletedBlock.archived).toBe(true);
});

test('extracts block ID from URL', async () => {
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');

  // Use a test block ID in URL format
  const testBlockId =
    process.env.TEST_NOTION_BLOCK_ID || '7985540b2e774ac68615c3047e36f872';
  const testUrl = `https://www.notion.so/myworkspace/${testBlockId}`;

  const ctx = await runConnector(handler, {
    blockId: testUrl,
    outputVariable: 'deletedBlock',
  });

  expect(ctx.outputs.deletedBlock).toBeTruthy();
});
