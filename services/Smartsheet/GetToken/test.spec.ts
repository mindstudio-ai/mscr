import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets token', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'token',
  });
  expect(ctx.outputs['token']).toBeTruthy();
});
