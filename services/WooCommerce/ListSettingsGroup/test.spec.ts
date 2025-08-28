import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves settings group and saves to output variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  // Mock global fetch
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      {
        id: 'woocommerce_currency',
        label: 'Currency',
        type: 'select',
        value: 'USD',
      },
    ],
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    groupId: 'general',
    outputVariable: 'settings',
  });

  expect(fetch).toHaveBeenCalledWith(
    'https://example.com/wp-json/wc/v3/settings/general',
    expect.objectContaining({
      method: 'GET',
      headers: expect.any(Object),
    }),
  );

  expect(ctx.outputs.settings).toBeTruthy();
  expect(Array.isArray(ctx.outputs.settings)).toBe(true);
});
