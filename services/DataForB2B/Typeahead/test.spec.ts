import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves typeahead suggestions to output variable', async () => {
  process.env.apiKey = process.env.DATAFORB2B_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    type: 'title',
    q: 'head of grow',
    limit: '10',
    outputVariable: 'suggestions',
  });

  expect(ctx.outputs['suggestions']).toBeTruthy();
  expect(ctx.outputs['suggestions'].results).toBeDefined();
});
