import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('ReactivateUser executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    userId: 'userId-sample',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});
