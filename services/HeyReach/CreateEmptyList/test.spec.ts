import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates an empty list and saves output', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listName: 'Test List',
    listType: 'USER_LIST',
    outputVariable: 'createdList',
  });

  expect(ctx.outputs['createdList']).toBeTruthy();
  expect(ctx.outputs['createdList'].name).toBe('Test List');
});
