import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists row attachments', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    rowId: 'test-row-id',
    outputVariable: 'attachments',
  });
  expect(ctx.outputs['attachments'].attachments).toBeDefined();
});
