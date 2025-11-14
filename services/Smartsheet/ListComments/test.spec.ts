import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists sheet comments', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    outputVariable: 'comments',
  });
  expect(ctx.outputs['comments'].comments).toBeDefined();
});
