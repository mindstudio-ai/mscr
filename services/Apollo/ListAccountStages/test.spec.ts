import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves account stages', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'accountStages',
  });

  expect(ctx.outputs['accountStages']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['accountStages'])).toBe(true);
});
