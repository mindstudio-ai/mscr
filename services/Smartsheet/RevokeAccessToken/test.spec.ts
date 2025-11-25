import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('RevokeAccessToken executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    deleteallforapiclient: true,
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});
