import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists sheet attachments', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    outputVariable: 'attachments',
  });

  expect(ctx.outputs['attachments']).toBeTruthy();
  expect(ctx.outputs['attachments'].attachments).toBeDefined();
});
