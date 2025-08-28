import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('appends blocks to a Notion page', async () => {
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    blockId: 'test-block-id',
    blocks: [
      {
        paragraph: {
          rich_text: [
            {
              text: {
                content: 'Test paragraph content',
              },
            },
          ],
        },
      },
    ],
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
});

test('extracts block ID from URL', async () => {
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    blockId: 'https://www.notion.so/myworkspace/Test-Page-abc123def456',
    blocks: [
      {
        paragraph: {
          rich_text: [
            {
              text: {
                content: 'Test paragraph content',
              },
            },
          ],
        },
      },
    ],
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
});
