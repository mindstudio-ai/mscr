import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a comment on a Notion page', async () => {
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    pageId: 'test-page-id',
    commentText: 'Test comment',
    outputVariable: 'commentResult',
  });

  expect(ctx.outputs['commentResult']).toBeTruthy();
});

test('creates a comment in a discussion thread', async () => {
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    discussionId: 'test-discussion-id',
    commentText: 'Test comment',
    outputVariable: 'commentResult',
  });

  expect(ctx.outputs['commentResult']).toBeTruthy();
});
