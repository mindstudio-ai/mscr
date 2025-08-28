import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a shipping class and saves output', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock global fetch
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 32,
      name: 'Priority',
      slug: 'priority',
      description: 'Priority shipping class',
      count: 0,
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    name: 'Priority',
    slug: 'priority',
    description: 'Priority shipping class',
    outputVariable: 'shippingClass',
  });

  expect(ctx.outputs['shippingClass']).toBeTruthy();
  expect(ctx.outputs['shippingClass'].id).toBe(32);
  expect(ctx.outputs['shippingClass'].name).toBe('Priority');
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
