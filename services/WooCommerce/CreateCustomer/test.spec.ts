import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a WooCommerce customer', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 25,
      email: 'test@example.com',
      first_name: 'Test',
      last_name: 'User',
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    outputVariable: 'customerData',
  });

  expect(ctx.outputs.customerData).toBeTruthy();
  expect(ctx.outputs.customerData.id).toBe(25);
  expect(ctx.outputs.customerData.email).toBe('test@example.com');
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
