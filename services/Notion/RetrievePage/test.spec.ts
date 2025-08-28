import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves page information', async () => {
  process.env.token = process.env.NOTION_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    pageIdOrUrl: '59833787-2cf9-4fdf-8782-e53db20768a5',
    outputVariable: 'pageData',
  });

  expect(ctx.outputs['pageData']).toBeTruthy();
});

test('handles page URL input', async () => {
  process.env.token = process.env.NOTION_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    pageIdOrUrl:
      'https://www.notion.so/myworkspace/Page-Title-59833787-2cf9-4fdf-8782-e53db20768a5',
    outputVariable: 'pageData',
  });

  expect(ctx.outputs['pageData']).toBeTruthy();
});
