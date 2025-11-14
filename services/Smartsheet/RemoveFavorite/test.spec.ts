import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('removes favorite', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    objectType: 'sheet',
    objectId: '123456789',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result'].success).toBe(true);
});
