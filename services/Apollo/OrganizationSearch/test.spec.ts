import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('searches organizations and saves output', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    organizationName: 'apollo',
    employeeRanges: '10,50',
    perPage: '5',
    page: '1',
    outputVariable: 'searchResults',
  });

  expect(ctx.outputs['searchResults']).toBeTruthy();
  expect(ctx.outputs['searchResults'].pagination).toBeDefined();
});
