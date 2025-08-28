import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('runs system status tool and saves output', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 'clear_transients',
      name: 'WC transients',
      action: 'Clear transients',
      description: 'This tool will clear the product/shop transients cache.',
      success: true,
      message: 'Product transients cleared',
    }),
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    toolId: 'clear_transients',
    confirm: 'true',
    outputVariable: 'result',
  });

  expect(ctx.outputs.result).toBeTruthy();
  expect(ctx.outputs.result.success).toBe(true);
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
