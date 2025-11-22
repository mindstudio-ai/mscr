import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('update dashboard', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sightId: 'test-sightId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
