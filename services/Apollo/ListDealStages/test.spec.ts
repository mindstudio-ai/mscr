import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves deal stages and saves to output variable', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'dealStages',
  });

  expect(ctx.outputs['dealStages']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['dealStages'])).toBe(true);
});
