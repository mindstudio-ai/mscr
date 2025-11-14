import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('searches across Smartsheets', async () => {
  // Mock environment variables
  process.env.accessToken = process.env.accessToken;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    searchQuery: 'test',
    outputVariable: 'searchResults',
  });

  // Verify output was set
  expect(ctx.outputs['searchResults']).toBeTruthy();
  expect(ctx.outputs['searchResults'].query).toBe('test');
  expect(ctx.outputs['searchResults'].totalCount).toBeDefined();
});
