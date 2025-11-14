import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists sights/dashboards', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'sights',
  });
  expect(ctx.outputs['sights'].sights).toBeDefined();
});
