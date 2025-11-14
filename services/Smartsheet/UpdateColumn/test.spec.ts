import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates column', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    columnId: 'test-column-id',
    title: 'Updated Title',
    outputVariable: 'updatedColumn',
  });
  expect(ctx.outputs['updatedColumn']).toBeTruthy();
});
