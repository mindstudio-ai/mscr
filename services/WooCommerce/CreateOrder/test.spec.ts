import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a WooCommerce order', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API call
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ id: 123, total: '24.99', status: 'processing' }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    paymentMethodId: 'bacs',
    paymentMethodTitle: 'Direct Bank Transfer',
    setPaid: 'true',
    billingFirstName: 'John',
    billingLastName: 'Doe',
    billingEmail: 'john.doe@example.com',
    billingPhone: '555-1234',
    billingAddress1: '123 Main St',
    billingAddress2: 'Apt 4B',
    billingCity: 'Anytown',
    billingState: 'CA',
    billingPostcode: '12345',
    billingCountry: 'US',
    sameAsBilling: 'true',
    lineItems: [{ product_id: 123, quantity: 1 }],
    shippingMethodId: 'flat_rate',
    shippingMethodTitle: 'Flat Rate',
    shippingCost: '5.00',
    outputVariable: 'orderId',
  });

  expect(global.fetch).toHaveBeenCalled();
  expect(ctx.outputs.orderId).toBe(123);
});
