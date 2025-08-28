import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves customer downloads', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      {
        download_id: '91447fd1849316bbc89dfb7e986a6006',
        download_url:
          'https://example.com/?download_file=87&order=wc_order_58d17c18352',
        product_id: 87,
        product_name: 'Test Product',
        download_name: 'Test Download',
        order_id: 723,
      },
    ],
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    customerId: '26',
    outputVariable: 'customerDownloads',
  });

  expect(ctx.outputs['customerDownloads']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['customerDownloads'])).toBe(true);
  expect(global.fetch).toHaveBeenCalledWith(
    'https://example.com/wp-json/wc/v3/customers/26/downloads',
    expect.objectContaining({
      method: 'GET',
      headers: expect.any(Object),
    }),
  );
});
