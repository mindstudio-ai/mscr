import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves review totals', async () => {
  // Set up environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'reviewTotals',
  });

  // Verify output was set
  expect(ctx.outputs['reviewTotals']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['reviewTotals'])).toBe(true);
});
