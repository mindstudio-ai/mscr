import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists brand templates and saves to output variable', async () => {
  process.env.token = process.env.CANVA_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    searchTerm: '',
    ownership: 'any',
    sortBy: 'relevance',
    datasetFilter: 'any',
    maxResults: '10',
    outputVariable: 'brandTemplates',
  });

  expect(ctx.outputs['brandTemplates']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['brandTemplates'])).toBe(true);
});
