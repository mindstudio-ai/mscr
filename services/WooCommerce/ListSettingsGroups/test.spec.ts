import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves WooCommerce settings groups', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock global fetch
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      {
        id: 'general',
        label: 'General',
        description: '',
        parent_id: '',
        sub_groups: [],
      },
    ],
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'settingsGroups',
  });

  expect(ctx.outputs.settingsGroups).toBeTruthy();
  expect(Array.isArray(ctx.outputs.settingsGroups)).toBe(true);
  expect(ctx.outputs.settingsGroups[0].id).toBe('general');
});
