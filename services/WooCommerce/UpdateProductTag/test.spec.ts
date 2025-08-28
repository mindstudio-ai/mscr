import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates product tag and saves output', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 34,
      name: 'Updated Tag',
      slug: 'updated-tag',
      description: 'Updated description',
      count: 0,
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    tagId: '34',
    name: 'Updated Tag',
    description: 'Updated description',
    outputVariable: 'updatedTag',
  });

  expect(ctx.outputs.updatedTag).toBeTruthy();
  expect(ctx.outputs.updatedTag.id).toBe(34);
  expect(ctx.outputs.updatedTag.name).toBe('Updated Tag');
  expect(ctx.outputs.updatedTag.description).toBe('Updated description');
});
