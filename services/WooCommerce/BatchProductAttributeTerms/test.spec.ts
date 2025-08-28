import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('batch product attribute terms operations', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      create: [{ id: 101, name: 'XXS' }],
      update: [{ id: 19, name: 'XL', menu_order: 6 }],
      delete: [{ id: 21 }],
    }),
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    attributeId: '2',
    createTerms: [{ name: 'XXS' }],
    updateTerms: [{ id: 19, name: 'XL', menu_order: 6 }],
    deleteTerms: '21',
    outputVariable: 'result',
  });

  expect(ctx.outputs.result).toBeTruthy();
  expect(ctx.outputs.result.create).toBeInstanceOf(Array);
  expect(ctx.outputs.result.update).toBeInstanceOf(Array);
  expect(ctx.outputs.result.delete).toBeInstanceOf(Array);
});
