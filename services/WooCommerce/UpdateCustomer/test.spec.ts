import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates a customer and saves output', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      id: 25,
      first_name: 'James',
      last_name: 'Doe',
      email: 'james.doe@example.com',
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    customerId: '25',
    firstName: 'James',
    lastName: 'Doe',
    outputVariable: 'updatedCustomer',
  });

  expect(ctx.outputs['updatedCustomer']).toBeTruthy();
  expect(ctx.outputs['updatedCustomer'].id).toBe(25);
  expect(ctx.outputs['updatedCustomer'].first_name).toBe('James');
});
