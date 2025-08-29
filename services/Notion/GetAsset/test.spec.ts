import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves asset information', async () => {
  // Set up mock environment
  process.env.token = 'mock_token';

  // Mock the global fetch function
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      asset: {
        type: 'image',
        id: 'Msd59349ff',
        name: 'Test Asset',
        tags: ['image', 'test'],
        created_at: 1377396000,
        updated_at: 1692928800,
        owner: {
          user_id: 'auDAbliZ2rQNNOsUl5OLu',
          team_id: 'Oi2RJILTrKk0KRhRUZozX',
        },
        thumbnail: {
          width: 595,
          height: 335,
          url: 'https://example.com/thumbnail.png',
        },
      },
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    assetId: 'Msd59349ff',
    outputVariable: 'assetInfo',
  });

  expect(ctx.outputs['assetInfo']).toBeTruthy();
  expect(ctx.outputs['assetInfo'].asset.id).toBe('Msd59349ff');
  expect(ctx.outputs['assetInfo'].asset.name).toBe('Test Asset');
});

test('handles error responses', async () => {
  process.env.token = 'mock_token';

  global.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 404,
    statusText: 'Not Found',
    json: async () => ({ error: 'Asset not found' }),
  });

  const { handler } = await import('./handler.ts');

  await expect(
    runConnector(handler, {
      assetId: 'invalid_id',
      outputVariable: 'assetInfo',
    }),
  ).rejects.toThrow();
});
