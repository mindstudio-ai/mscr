import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves product custom field names', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  // Mock global fetch
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ['Custom field 1', 'Custom field 2'],
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    perPage: '20',
    page: '1',
    search: 'test',
    order: 'asc',
    outputVariable: 'customFields',
  });

  expect(ctx.outputs.customFields).toEqual([
    'Custom field 1',
    'Custom field 2',
  ]);
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
