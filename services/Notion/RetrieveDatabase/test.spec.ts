import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves database information', async () => {
  process.env.token = process.env.NOTION_API_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    databaseId:
      process.env.NOTION_TEST_DATABASE_ID ||
      '668d797c-76fa-4934-9b05-ad288df2d136',
    outputVariable: 'databaseInfo',
  });

  expect(ctx.outputs['databaseInfo']).toBeTruthy();
  expect(ctx.outputs['databaseInfo'].object).toBe('database');
  expect(ctx.outputs['databaseInfo'].id).toBeTruthy();
});
