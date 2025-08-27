import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('fetches deals and saves to output variable', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sortByField: 'amount',
    page: '1',
    perPage: '10',
    outputVariable: 'deals',
  });

  expect(ctx.outputs['deals']).toBeTruthy();
});
