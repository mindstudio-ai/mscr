import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('searches Notion and saves results to output variable', async () => {
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    query: 'test',
    filterType: '',
    sortDirection: 'descending',
    pageSize: '10',
    startCursor: '',
    outputVariable: 'searchResults',
  });

  expect(ctx.outputs['searchResults']).toBeTruthy();
});
