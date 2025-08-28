import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves order email templates', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      {
        id: 'customer_completed_order',
        title: 'Completed order',
        description:
          'Order complete emails are sent to customers when their orders are marked completed.',
      },
    ],
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    orderId: '123',
    outputVariable: 'templates',
  });

  expect(ctx.outputs.templates).toBeTruthy();
  expect(Array.isArray(ctx.outputs.templates)).toBe(true);
  expect(ctx.outputs.templates[0]).toHaveProperty('id');
  expect(ctx.outputs.templates[0]).toHaveProperty('title');
  expect(ctx.outputs.templates[0]).toHaveProperty('description');
});
