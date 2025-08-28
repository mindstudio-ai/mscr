import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves order details', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');

  // Mock the order ID to retrieve
  const ctx = await runConnector(handler, {
    orderId: '727',
    decimalPoints: '2',
    outputVariable: 'orderDetails',
  });

  // Just check that we set the output variable
  expect(ctx.outputs['orderDetails']).toBeTruthy();
});
