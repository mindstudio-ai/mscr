import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves product attribute and saves to output variable', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API call
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      id: 1,
      name: 'Color',
      slug: 'pa_color',
      type: 'select',
      order_by: 'menu_order',
      has_archives: true,
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    attributeId: '1',
    outputVariable: 'attributeData',
  });

  expect(ctx.outputs['attributeData']).toBeTruthy();
  expect(ctx.outputs['attributeData'].name).toBe('Color');
});
