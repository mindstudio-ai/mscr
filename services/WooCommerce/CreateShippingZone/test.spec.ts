import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a shipping zone and saves output', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    status: 201,
    json: async () => ({
      id: 5,
      name: 'Test Zone',
      order: 0,
    }),
    ok: true,
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    zoneName: 'Test Zone',
    outputVariable: 'createdZone',
  });

  expect(global.fetch).toHaveBeenCalled();
  expect(ctx.outputs['createdZone']).toBeTruthy();
  expect(ctx.outputs['createdZone'].name).toBe('Test Zone');
});
