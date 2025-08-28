import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a Notion database', async () => {
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    parentPageId:
      process.env.TEST_NOTION_PAGE_ID || '98ad959b-2b6a-4774-80ee-00246fb0ea9b',
    databaseTitle: 'Test Database',
    propertiesDefinition: {
      Name: { title: {} },
      Notes: { rich_text: {} },
    },
    iconEmoji: '📝',
    outputVariable: 'createdDatabase',
  });

  expect(ctx.outputs['createdDatabase']).toBeTruthy();
  expect(ctx.outputs['createdDatabase'].id).toBeTruthy();
  expect(ctx.outputs['createdDatabase'].title[0].text.content).toBe(
    'Test Database',
  );
});
