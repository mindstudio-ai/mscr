import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves product tag and saves to output variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 34,
      name: 'Leather Shoes',
      slug: 'leather-shoes',
      description: '',
      count: 0,
    }),
  });

  const ctx = await runConnector(handler, {
    tagId: '34',
    outputVariable: 'tagData',
  });

  expect(ctx.outputs['tagData']).toBeTruthy();
  expect(ctx.outputs['tagData'].id).toBe(34);
  expect(ctx.outputs['tagData'].name).toBe('Leather Shoes');
});
