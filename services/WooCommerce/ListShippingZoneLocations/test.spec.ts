import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves shipping zone locations', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  // Mock global fetch
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => [
      {
        code: 'US',
        type: 'country',
        _links: {
          collection: [
            {
              href: 'https://example.com/wp-json/wc/v3/shipping/zones/1/locations',
            },
          ],
          describes: [
            { href: 'https://example.com/wp-json/wc/v3/shipping/zones/1' },
          ],
        },
      },
    ],
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    zoneId: '1',
    outputVariable: 'zoneLocations',
  });

  expect(ctx.outputs.zoneLocations).toBeTruthy();
  expect(ctx.outputs.zoneLocations).toBeInstanceOf(Array);
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
