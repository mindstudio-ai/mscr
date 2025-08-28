import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists product attribute terms', async () => {
  // Set up environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');

  // Run the connector with minimal required inputs
  const ctx = await runConnector(handler, {
    attributeId: '1', // Use a valid attribute ID for your test store
    outputVariable: 'attributeTerms',
  });

  // Verify that the output was set
  expect(ctx.outputs.attributeTerms).toBeDefined();
  expect(Array.isArray(ctx.outputs.attributeTerms)).toBe(true);
});
