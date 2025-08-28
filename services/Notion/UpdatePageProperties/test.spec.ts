import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates page properties and saves output', async () => {
  // This test requires a valid Notion token and page ID to be set in environment variables
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');

  // Skip test if no token is available
  if (!process.env.token || !process.env.NOTION_TEST_PAGE_ID) {
    console.log('Skipping test: No Notion token or test page ID available');
    return;
  }

  const ctx = await runConnector(handler, {
    pageIdOrUrl: process.env.NOTION_TEST_PAGE_ID,
    properties: {
      Status: {
        select: {
          name: 'Testing',
        },
      },
    },
    outputVariable: 'updatedPage',
  });

  expect(ctx.outputs['updatedPage']).toBeTruthy();
  expect(ctx.outputs['updatedPage'].id).toBe(process.env.NOTION_TEST_PAGE_ID);
});
