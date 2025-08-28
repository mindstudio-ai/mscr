import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves tax rate and saves to output variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      id: 72,
      country: 'US',
      state: 'AL',
      rate: '4.0000',
      name: 'State Tax',
    }),
  });

  const ctx = await runConnector(handler, {
    taxRateId: '72',
    outputVariable: 'taxRateData',
  });

  expect(ctx.outputs['taxRateData']).toBeTruthy();
  expect(ctx.outputs['taxRateData'].id).toBe(72);
  expect(ctx.outputs['taxRateData'].name).toBe('State Tax');
});
