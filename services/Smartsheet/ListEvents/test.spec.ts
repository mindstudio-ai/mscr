import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists events', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'events',
  });
  expect(ctx.outputs['events'].events).toBeDefined();
});
