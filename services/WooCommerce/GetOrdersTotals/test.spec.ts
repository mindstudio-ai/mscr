import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves order totals and saves to output variable', async () => {
  // Set environment variables for testing
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'orderTotals',
  });

  expect(ctx.outputs['orderTotals']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['orderTotals'])).toBe(true);
});
