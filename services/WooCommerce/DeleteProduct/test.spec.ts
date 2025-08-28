import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a product and saves output to variable', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    productId: '123',
    force: 'true',
    outputVariable: 'deletedProduct',
  });

  expect(ctx.outputs['deletedProduct']).toBeTruthy();
});
