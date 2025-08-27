import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists segments and saves output to variable', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    type: 'all',
    status: 'all',
    limit: '10',
    page: '1',
    orderBy: 'created',
    direction: 'asc',
    includeStats: 'true',
    outputVariable: 'segmentsList',
  });

  expect(ctx.outputs['segmentsList']).toBeTruthy();
});
