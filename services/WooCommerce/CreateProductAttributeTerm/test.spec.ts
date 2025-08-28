import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a product attribute term', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      id: 123,
      name: 'XXS',
      slug: 'xxs',
      description: 'Extra extra small size',
      menu_order: 1,
      count: 0,
    }),
  });

  const ctx = await runConnector(handler, {
    attributeId: '2',
    name: 'XXS',
    slug: 'xxs',
    description: 'Extra extra small size',
    menuOrder: '1',
    outputVariable: 'attributeTerm',
  });

  expect(ctx.outputs.attributeTerm).toBeTruthy();
  expect(ctx.outputs.attributeTerm.id).toBe(123);
  expect(ctx.outputs.attributeTerm.name).toBe('XXS');
});
