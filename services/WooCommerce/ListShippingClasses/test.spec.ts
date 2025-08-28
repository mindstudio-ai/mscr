import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists shipping classes and saves to output variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ([
      {
        id: 33,
        name: "Express",
        slug: "express",
        description: "",
        count: 0
      }
    ])
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    perPage: "10",
    page: "1",
    order: "asc",
    orderby: "name",
    search: "",
    outputVariable: "shippingClasses"
  });

  expect(ctx.outputs.shippingClasses).toBeTruthy();
  expect(Array.isArray(ctx.outputs.shippingClasses)).toBe(true);
  expect(global.fetch).toHaveBeenCalled();
});