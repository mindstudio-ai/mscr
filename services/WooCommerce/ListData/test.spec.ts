import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves WooCommerce data endpoints', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'dataEndpoints',
  });

  expect(ctx.outputs['dataEndpoints']).toBeDefined();
  expect(Array.isArray(ctx.outputs['dataEndpoints'])).toBe(true);
});
