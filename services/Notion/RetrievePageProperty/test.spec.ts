import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves page property and saves to output variable', async () => {
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    pageId: 'b55c9c91-384d-452b-81db-d1ef79372b75',
    propertyId: 'title',
    outputVariable: 'propertyData',
  });

  expect(ctx.outputs['propertyData']).toBeTruthy();
});

test('handles page ID from Notion URL', async () => {
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    pageId:
      'https://www.notion.so/myworkspace/b55c9c91384d452b81dbd1ef79372b75',
    propertyId: 'title',
    outputVariable: 'propertyData',
  });

  expect(ctx.outputs['propertyData']).toBeTruthy();
});
