import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves product information', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    productId: '794',
    outputVariable: 'productData',
  });

  expect(ctx.outputs['productData']).toBeTruthy();
});
