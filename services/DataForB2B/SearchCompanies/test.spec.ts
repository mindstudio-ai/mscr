import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves company search results to output variable', async () => {
  process.env.apiKey = process.env.DATAFORB2B_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    industry: 'software development',
    employeeCount: '11-50, 51-200',
    count: '5',
    offset: '0',
    enrichLive: 'false',
    outputVariable: 'searchResults',
  });

  expect(ctx.outputs['searchResults']).toBeTruthy();
  expect(ctx.outputs['searchResults'].results).toBeDefined();
});
