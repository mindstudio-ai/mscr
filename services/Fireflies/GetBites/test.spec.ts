import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves bites and saves to output variable', async () => {
  process.env.apiKey = process.env.FIREFLIES_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    mine: 'true',
    outputVariable: 'bitesList',
  });

  expect(ctx.outputs['bitesList']).toBeTruthy();
});
