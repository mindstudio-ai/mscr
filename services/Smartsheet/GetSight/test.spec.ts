import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets sight/dashboard', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sightId: 'test-sight-id',
    outputVariable: 'sight',
  });
  expect(ctx.outputs['sight']).toBeTruthy();
});
