import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves system status and saves to output variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  // Mock the fetch function
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      environment: { version: '7.0.0' },
      database: { wc_database_version: '7.0.0' },
    }),
  });

  const { handler } = await import('./handler');

  const ctx = await runConnector(handler, {
    outputVariable: 'systemStatus',
  });

  expect(ctx.outputs.systemStatus).toBeTruthy();
  expect(ctx.outputs.systemStatus.environment).toBeDefined();
  expect(ctx.outputs.systemStatus.database).toBeDefined();
});
