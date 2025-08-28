import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a product tag', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock global fetch
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 34,
      name: 'Leather Shoes',
      slug: 'leather-shoes',
      description: 'Genuine leather.',
      count: 0,
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    tagId: '34',
    confirmDeletion: 'yes',
    outputVariable: 'deletedTag',
  });

  expect(ctx.outputs.deletedTag).toBeTruthy();
  expect(ctx.outputs.deletedTag.id).toBe(34);
  expect(ctx.outputs.deletedTag.name).toBe('Leather Shoes');
});

test('throws error when confirmation is not yes', async () => {
  const { handler } = await import('./handler.ts');

  await expect(
    runConnector(handler, {
      tagId: '34',
      confirmDeletion: 'no',
      outputVariable: 'deletedTag',
    }),
  ).rejects.toThrow('Deletion not confirmed');
});
