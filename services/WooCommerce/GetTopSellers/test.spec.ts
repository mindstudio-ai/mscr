import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves top sellers report', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    period: 'week',
    outputVariable: 'topSellers',
  });

  expect(ctx.outputs['topSellers']).toBeTruthy();
});
