import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('ResetSharedSecret executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    webhookId: 'webhookId-sample',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});
