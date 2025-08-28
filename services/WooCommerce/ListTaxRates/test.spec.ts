import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists tax rates and saves to output variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      {
        id: 72,
        country: 'US',
        state: 'AL',
        rate: '4.0000',
        name: 'State Tax',
      },
    ],
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    page: '1',
    perPage: '10',
    order: 'asc',
    orderby: 'order',
    class: 'standard',
    outputVariable: 'taxRates',
  });

  expect(ctx.outputs['taxRates']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['taxRates'])).toBe(true);
  expect(global.fetch).toHaveBeenCalled();
});
