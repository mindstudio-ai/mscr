import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves comment from Notion', async () => {
  // Mock environment variables
  process.env.token = process.env.NOTION_API_TOKEN;

  const { handler } = await import('./handler.ts');

  // Use a valid comment ID for testing
  // This should be replaced with a real comment ID for actual testing
  const ctx = await runConnector(handler, {
    commentIdOrUrl: '249911a-125e-803e-a164-001cf338b8ec',
    outputVariable: 'commentData',
  });

  expect(ctx.outputs['commentData']).toBeTruthy();
});
