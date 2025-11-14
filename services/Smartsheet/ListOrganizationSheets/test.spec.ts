import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists organization sheets', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'sheets',
  });
  expect(ctx.outputs['sheets'].sheets).toBeDefined();
});
