import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates shipping class and saves output', async () => {
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
      description: 'Priority mail.',
      count: 0,
    }),
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    shippingClassId: '32',
    name: 'Priority',
    description: 'Priority mail.',
    outputVariable: 'updatedShippingClass',
  });

  expect(global.fetch).toHaveBeenCalled();
  expect(ctx.outputs['updatedShippingClass']).toBeTruthy();
  expect(ctx.outputs['updatedShippingClass'].id).toBe(32);
});
