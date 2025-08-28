import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('batch update orders - create only', async () => {
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ create: [{ id: 123 }], update: [], delete: [] }),
  });

  const ctx = await runConnector(handler, {
    ordersToCreate: [
      {
        payment_method: 'bacs',
        billing: { first_name: 'Test' },
        line_items: [{ product_id: 123, quantity: 1 }],
      },
    ],
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
  expect(ctx.outputs['result'].create).toBeDefined();
});

test('batch update orders - all operations', async () => {
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      create: [{ id: 123 }],
      update: [{ id: 456 }],
      delete: [789],
    }),
  });

  const ctx = await runConnector(handler, {
    ordersToCreate: [{ payment_method: 'bacs' }],
    ordersToUpdate: [{ id: 456, status: 'completed' }],
    ordersToDelete: [789],
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
  expect(ctx.outputs['result'].create).toBeDefined();
  expect(ctx.outputs['result'].update).toBeDefined();
  expect(ctx.outputs['result'].delete).toBeDefined();
});
