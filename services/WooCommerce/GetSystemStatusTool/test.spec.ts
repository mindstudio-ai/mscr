import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves system status tool information', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock the WooCommerce API response
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 'clear_transients',
          name: 'WC transients',
          action: 'Clear transients',
          description:
            'This tool will clear the product/shop transients cache.',
        }),
    }),
  );

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    toolId: 'clear_transients',
    outputVariable: 'toolInfo',
  });

  expect(ctx.outputs.toolInfo).toBeDefined();
  expect(ctx.outputs.toolInfo.id).toBe('clear_transients');
  expect(ctx.outputs.toolInfo.name).toBe('WC transients');
});
