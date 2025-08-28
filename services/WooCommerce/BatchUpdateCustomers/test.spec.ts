import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('batch update customers', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      create: [{ id: 27, email: 'john.doe@example.com' }],
      update: [{ id: 26, email: 'updated@example.com' }],
      delete: [{ id: 25 }],
    }),
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    createCustomers: [
      { email: 'john.doe@example.com', first_name: 'John', last_name: 'Doe' },
    ],
    updateCustomers: [{ id: 26, email: 'updated@example.com' }],
    deleteCustomers: '25',
    outputVariable: 'result',
  });

  expect(ctx.outputs.result).toBeTruthy();
  expect(ctx.outputs.result.create).toBeInstanceOf(Array);
  expect(ctx.outputs.result.update).toBeInstanceOf(Array);
  expect(ctx.outputs.result.delete).toBeInstanceOf(Array);

  expect(global.fetch).toHaveBeenCalledTimes(1);
});
