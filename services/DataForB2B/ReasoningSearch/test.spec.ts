import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves reasoning search results to output variable', async () => {
  process.env.apiKey = process.env.DATAFORB2B_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    query: 'heads of growth at seed-stage fintech startups in the US',
    category: 'people',
    maxResults: '5',
    enrichLive: 'false',
    outputVariable: 'searchResults',
  });

  expect(ctx.outputs['searchResults']).toBeTruthy();
  expect(ctx.outputs['searchResults'].status).toBeDefined();
});
