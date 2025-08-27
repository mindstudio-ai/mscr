import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves search results to output variable', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    personTitles: 'marketing manager',
    includeSimilarTitles: 'true',
    personSeniorities: 'director',
    page: '1',
    perPage: '5',
    outputVariable: 'searchResults',
  });

  expect(ctx.outputs['searchResults']).toBeTruthy();
  expect(ctx.outputs['searchResults'].contacts).toBeDefined();
  expect(ctx.outputs['searchResults'].pagination).toBeDefined();
});
