import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes product attribute term and saves output', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock the WooCommerce API response
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 23,
          name: 'Deleted Term',
          slug: 'deleted-term',
          description: 'This term was deleted',
        }),
    }),
  );

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    attributeId: '2',
    termId: '23',
    outputVariable: 'deletedTerm',
  });

  expect(ctx.outputs.deletedTerm).toBeTruthy();
  expect(ctx.outputs.deletedTerm.id).toBe(23);
});
