import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates Notion database and saves output', async () => {
  // Set the environment variables
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');

  // Run the connector with test inputs
  const ctx = await runConnector(handler, {
    databaseId:
      process.env.TEST_NOTION_DATABASE_ID ||
      '668d797c-76fa-4934-9b05-ad288df2d136',
    title: 'Updated Test Database',
    description: 'This is a test description',
    propertiesJson: null, // Don't update properties in test
    outputVariable: 'updatedDatabase',
  });

  // Verify output was set
  expect(ctx.outputs['updatedDatabase']).toBeTruthy();
  expect(ctx.outputs['updatedDatabase'].id).toBeTruthy();
});
