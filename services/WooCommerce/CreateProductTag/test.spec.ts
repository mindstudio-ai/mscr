import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a product tag and saves output', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 201,
    json: async () => ({
      id: 34,
      name: 'Test Tag',
      slug: 'test-tag',
      description: 'Test description',
      count: 0,
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    name: 'Test Tag',
    slug: 'test-tag',
    description: 'Test description',
    outputVariable: 'createdTag',
  });

  expect(ctx.outputs['createdTag']).toBeTruthy();
  expect(ctx.outputs['createdTag'].id).toBe(34);
  expect(ctx.outputs['createdTag'].name).toBe('Test Tag');
});
