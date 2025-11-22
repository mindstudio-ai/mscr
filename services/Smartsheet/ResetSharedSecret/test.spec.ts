import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('reset shared secret', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    webhookId: 'test-webhookId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
