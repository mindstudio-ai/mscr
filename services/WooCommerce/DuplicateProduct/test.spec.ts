import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('duplicates a product and saves output', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    productId: '123',
    outputVariable: 'duplicatedProduct',
  });

  expect(ctx.outputs['duplicatedProduct']).toBeTruthy();
});
