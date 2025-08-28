import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a shipping class and saves output', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to prevent actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 32,
      name: 'Priority',
      slug: 'priority',
      description: 'Priority mail.',
      count: 0,
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    shippingClassId: '32',
    outputVariable: 'deletedShippingClass',
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'https://example.com/wp-json/wc/v3/products/shipping_classes/32?force=true',
    expect.objectContaining({
      method: 'DELETE',
    }),
  );

  expect(ctx.outputs.deletedShippingClass).toBeTruthy();
  expect(ctx.outputs.deletedShippingClass.id).toBe(32);
});
