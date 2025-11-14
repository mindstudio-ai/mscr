import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates discussion', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    title: 'Test Discussion',
    commentText: 'Initial comment',
    outputVariable: 'discussion',
  });
  expect(ctx.outputs['discussion']).toBeTruthy();
});
