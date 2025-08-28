import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves product review and saves to output variable', async () => {
  // Setup environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    reviewId: '22',
    outputVariable: 'reviewData',
  });

  expect(ctx.outputs['reviewData']).toBeTruthy();
});
