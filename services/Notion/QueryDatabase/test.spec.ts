import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('queries a Notion database and saves results to output variable', async () => {
  // Set up environment variables
  process.env.token = process.env.NOTION_TEST_TOKEN;

  const { handler } = await import('./handler.ts');

  // Mock database ID - use a valid test database ID if available
  const testDatabaseId =
    process.env.NOTION_TEST_DATABASE_ID ||
    'd9824bdc-8445-4327-be8b-5b47500af6ce';

  const ctx = await runConnector(handler, {
    databaseId: testDatabaseId,
    pageSize: '10',
    outputVariable: 'queryResults',
  });

  // Verify that output was set
  expect(ctx.outputs['queryResults']).toBeTruthy();
  expect(ctx.outputs['queryResults'].object).toBe('list');
  expect(Array.isArray(ctx.outputs['queryResults'].results)).toBe(true);
});
