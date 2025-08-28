import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('performs batch operations on product tags', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      create: [{ id: 36, name: 'Round toe' }],
      update: [{ id: 34, description: 'Updated description' }],
      delete: [{ id: 35 }],
    }),
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    createTags: [{ name: 'Round toe' }],
    updateTags: [{ id: 34, description: 'Updated description' }],
    deleteTags: [35],
    outputVariable: 'batchResult',
  });

  expect(ctx.outputs.batchResult).toBeTruthy();
  expect(ctx.outputs.batchResult.create).toHaveLength(1);
  expect(ctx.outputs.batchResult.update).toHaveLength(1);
  expect(ctx.outputs.batchResult.delete).toHaveLength(1);
});
