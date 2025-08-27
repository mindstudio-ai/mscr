import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists posts from beehiiv publication', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    audience: 'all',
    platform: 'all',
    status: 'all',
    limit: '10',
    page: '1',
    orderBy: 'created',
    direction: 'desc',
    includeStats: 'false',
    outputVariable: 'posts',
  });

  expect(ctx.outputs['posts']).toBeTruthy();
});
