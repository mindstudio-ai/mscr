import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('list webhooks', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
