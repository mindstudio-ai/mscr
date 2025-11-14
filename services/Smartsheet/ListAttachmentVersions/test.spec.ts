import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists attachment versions', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    attachmentId: 'test-attachment-id',
    outputVariable: 'versions',
  });
  expect(ctx.outputs['versions'].versions).toBeDefined();
});
