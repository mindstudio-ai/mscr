import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists designs and saves to output variable', async () => {
  // Set up environment variables
  process.env.token = process.env.CANVA_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    searchTerm: '',
    ownership: 'any',
    sortBy: 'relevance',
    continuation: '',
    outputVariable: 'designs',
  });

  expect(ctx.outputs['designs']).toBeTruthy();
  expect(ctx.outputs['designs'].items).toBeDefined();
});
