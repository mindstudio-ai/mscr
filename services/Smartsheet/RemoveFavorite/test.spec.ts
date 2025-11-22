import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('delete favorite', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    favoriteType: 'test-favoriteType',
    favoriteId: 'test-favoriteId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
