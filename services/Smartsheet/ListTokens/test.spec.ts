import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists tokens', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'tokens',
  });
  expect(ctx.outputs['tokens'].tokens).toBeDefined();
});
