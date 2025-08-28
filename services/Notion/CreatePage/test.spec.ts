import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a page in Notion', async () => {
  // Mock environment variables
  process.env.token = process.env.NOTION_API_KEY;

  const { handler } = await import('./handler.ts');

  // Sample test data
  const ctx = await runConnector(handler, {
    parentType: 'page_id',
    parentId: 'test-page-id',
    pageTitle: 'Test Page',
    outputVariable: 'createdPage',
  });

  // Verify output was set
  expect(ctx.outputs['createdPage']).toBeTruthy();
});
