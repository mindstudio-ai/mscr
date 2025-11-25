import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets discussion', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    discussionId: 'test-discussion-id',
    outputVariable: 'discussion',
  });
  expect(ctx.outputs['discussion']).toBeTruthy();
});
