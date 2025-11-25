import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes attachment versions', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    attachmentId: 'test-attachment-id',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result'].success).toBe(true);
});
