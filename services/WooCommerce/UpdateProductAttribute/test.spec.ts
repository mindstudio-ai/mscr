import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates a product attribute', async () => {
  // Set up environment variables
  process.env.url = 'https://example-store.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 1,
      name: 'Updated Color',
      slug: 'pa_color',
      type: 'select',
      order_by: 'name',
      has_archives: true,
    }),
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    attributeId: '1',
    name: 'Updated Color',
    orderBy: 'name',
    hasArchives: 'true',
    outputVariable: 'updatedAttribute',
  });

  expect(ctx.outputs.updatedAttribute).toBeTruthy();
  expect(ctx.outputs.updatedAttribute.name).toBe('Updated Color');
  expect(ctx.outputs.updatedAttribute.order_by).toBe('name');
  expect(ctx.outputs.updatedAttribute.has_archives).toBe(true);
});
