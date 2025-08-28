import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves product variation and saves to output variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    productId: '123',
    variationId: '456',
    outputVariable: 'productVariation',
  });

  expect(ctx.outputs['productVariation']).toBeTruthy();
});
