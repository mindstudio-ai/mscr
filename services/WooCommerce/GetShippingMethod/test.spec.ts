import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves shipping method and saves to output variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      instance_id: 26,
      title: 'Flat rate',
      method_id: 'flat_rate',
      enabled: true,
    }),
  });

  const ctx = await runConnector(handler, {
    zoneId: '5',
    methodId: '26',
    outputVariable: 'shippingMethod',
  });

  expect(ctx.outputs.shippingMethod).toBeTruthy();
  expect(ctx.outputs.shippingMethod.instance_id).toBe(26);
  expect(ctx.outputs.shippingMethod.title).toBe('Flat rate');
});
