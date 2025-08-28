import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates a Notion block', async () => {
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    blockIdOrUrl:
      process.env.TEST_BLOCK_ID || '9bc30ad4-9373-46a5-84ab-0a7845ee52e6',
    blockType: 'paragraph',
    content: 'This is a test paragraph',
    color: 'default',
    outputVariable: 'updatedBlock',
  });

  expect(ctx.outputs['updatedBlock']).toBeTruthy();
  expect(ctx.outputs['updatedBlock'].id).toBeTruthy();
});
