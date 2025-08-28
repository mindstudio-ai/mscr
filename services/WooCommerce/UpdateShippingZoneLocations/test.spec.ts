import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates shipping zone locations', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      { code: 'US:CA', type: 'state' },
      { code: 'US:NY', type: 'state' },
    ],
    status: 200,
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    zoneId: '5',
    locations: [
      { code: 'US:CA', type: 'state' },
      { code: 'US:NY', type: 'state' },
    ],
    outputVariable: 'updatedLocations',
  });

  expect(ctx.outputs.updatedLocations).toBeTruthy();
  expect(ctx.outputs.updatedLocations).toBeInstanceOf(Array);
  expect(ctx.outputs.updatedLocations.length).toBe(2);
  expect(ctx.outputs.updatedLocations[0].code).toBe('US:CA');
  expect(ctx.outputs.updatedLocations[0].type).toBe('state');

  // Verify fetch was called with correct arguments
  expect(global.fetch).toHaveBeenCalledTimes(1);
  const [url, options] = (global.fetch as any).mock.calls[0];
  expect(url).toContain('/wp-json/wc/v3/shipping/zones/5/locations');
  expect(options.method).toBe('PUT');
});
