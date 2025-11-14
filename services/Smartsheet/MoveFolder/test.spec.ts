import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('moves folder', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    folderId: 'test-folder-id',
    destinationType: 'home',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
