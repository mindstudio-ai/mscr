import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates payment gateway and saves output', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      id: 'bacs',
      enabled: false,
      title: 'Direct bank transfer',
      settings: {
        title: {
          value: 'Updated title',
        },
      },
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    gatewayId: 'bacs',
    enabled: 'false',
    settings: {
      title: {
        value: 'Updated title',
      },
    },
    outputVariable: 'updatedGateway',
  });

  expect(ctx.outputs.updatedGateway).toBeTruthy();
  expect(ctx.outputs.updatedGateway.id).toBe('bacs');
  expect(ctx.outputs.updatedGateway.enabled).toBe(false);
});
