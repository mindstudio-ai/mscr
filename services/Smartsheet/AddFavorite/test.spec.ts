import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds favorite', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    objectType: 'sheet',
    objectId: '123456789',
    outputVariable: 'favorite',
  });
  expect(ctx.outputs['favorite']).toBeTruthy();
});
