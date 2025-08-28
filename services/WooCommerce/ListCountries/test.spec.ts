import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves countries list', async () => {
  // Set environment variables
  process.env.url = process.env.WOOCOMMERCE_URL;
  process.env.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  process.env.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'countriesList',
  });

  // Verify that the output is set and is an array
  expect(ctx.outputs['countriesList']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['countriesList'])).toBe(true);

  // Verify that the countries have the expected structure
  if (ctx.outputs['countriesList'].length > 0) {
    const firstCountry = ctx.outputs['countriesList'][0];
    expect(firstCountry).toHaveProperty('code');
    expect(firstCountry).toHaveProperty('name');
    expect(firstCountry).toHaveProperty('states');
  }
});
