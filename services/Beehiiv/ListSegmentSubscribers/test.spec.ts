import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists segment subscribers and saves to output variable', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    segmentId: 'seg_00000000-0000-0000-0000-000000000000',
    limit: '10',
    page: '1',
    outputVariable: 'subscribersList',
  });

  expect(ctx.outputs['subscribersList']).toBeTruthy();
  expect(ctx.outputs['subscribersList']).toHaveProperty('data');
  expect(ctx.outputs['subscribersList']).toHaveProperty('limit');
  expect(ctx.outputs['subscribersList']).toHaveProperty('page');
  expect(ctx.outputs['subscribersList']).toHaveProperty('total_results');
  expect(ctx.outputs['subscribersList']).toHaveProperty('total_pages');
});
