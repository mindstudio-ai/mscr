import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists publications and saves to output variable', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    expandStats: 'stats',
    limit: '10',
    page: '1',
    direction: 'asc',
    orderBy: 'created',
    outputVariable: 'publications',
  });

  expect(ctx.outputs['publications']).toBeTruthy();
  expect(ctx.outputs['publications'].data).toBeDefined();
});
