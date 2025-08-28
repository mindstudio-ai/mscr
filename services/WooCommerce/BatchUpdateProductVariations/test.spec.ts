import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves batch update response to output variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    productId: '123',
    createVariations: [
      { regular_price: '10.00', attributes: [{ id: 6, option: 'Blue' }] },
    ],
    updateVariations: [{ id: 733, regular_price: '12.00' }],
    deleteVariations: [732],
    outputVariable: 'batchResult',
  });

  expect(ctx.outputs['batchResult']).toBeTruthy();
});
