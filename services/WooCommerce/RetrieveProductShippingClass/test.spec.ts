import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves shipping class details', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 32,
      name: 'Priority',
      slug: 'priority',
      description: '',
      count: 0,
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    shippingClassId: '32',
    outputVariable: 'shippingClass',
  });

  expect(ctx.outputs.shippingClass).toBeTruthy();
  expect(ctx.outputs.shippingClass.id).toBe(32);
  expect(ctx.outputs.shippingClass.name).toBe('Priority');
});
