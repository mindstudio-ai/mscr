import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves product custom field names', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  
  // Mock the fetch response
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => (["Custom field 1", "Custom field 2"])
  });

  const ctx = await runConnector(handler, {
    perPage: "20",
    page: "1",
    order: "desc",
    outputVariable: "customFieldNames"
  });

  expect(ctx.outputs.customFieldNames).toBeTruthy();
  expect(Array.isArray(ctx.outputs.customFieldNames)).toBe(true);
});