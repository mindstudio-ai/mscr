import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a shipping class and saves output', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Import handler
  const { handler } = await import('./handler.ts');
  
  // Mock fetch to return a successful response
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      id: 32,
      name: 'Priority',
      slug: 'priority',
      description: 'Test description',
      count: 0
    }),
  });

  // Run the connector
  const ctx = await runConnector(handler, {
    name: 'Priority',
    slug: 'priority',
    description: 'Test description',
    outputVariable: 'shippingClass'
  });

  // Verify the output was set correctly
  expect(ctx.outputs['shippingClass']).toBeTruthy();
  expect(ctx.outputs['shippingClass'].id).toBe(32);
  expect(ctx.outputs['shippingClass'].name).toBe('Priority');
});