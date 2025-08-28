import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves list of reports', async () => {
  // Set environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'reports',
  });

  // Verify that the output contains the reports data
  expect(ctx.outputs['reports']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['reports'])).toBe(true);
});
