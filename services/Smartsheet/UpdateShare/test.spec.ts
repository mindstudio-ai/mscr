import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates share', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    shareId: 'test-share-id',
    accessLevel: 'EDITOR',
    outputVariable: 'share',
  });
  expect(ctx.outputs['share']).toBeTruthy();
});
