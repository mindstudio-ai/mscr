import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('searches news articles and saves output', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    organizationIds: '5e66b6381e05b4008c8331b8',
    categories: 'hires',
    publishedMin: '2023-01-01',
    publishedMax: '2023-12-31',
    perPage: '10',
    page: '1',
    outputVariable: 'newsArticles',
  });

  expect(ctx.outputs['newsArticles']).toBeTruthy();
});
