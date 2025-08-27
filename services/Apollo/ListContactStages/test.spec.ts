import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists contact stages and saves to output variable', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'contactStages',
  });

  expect(ctx.outputs['contactStages']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['contactStages'])).toBe(true);
});
