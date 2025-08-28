import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a product review and saves output', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      deleted: true,
      previous: {
        id: 20,
        product_id: 31,
        status: 'approved',
        reviewer: 'John Doe',
        reviewer_email: 'john.doe@example.com',
        review: 'Great product!',
        rating: 5,
        verified: true,
      },
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    reviewId: '20',
    outputVariable: 'deletionResult',
  });

  expect(ctx.outputs.deletionResult).toBeTruthy();
  expect(ctx.outputs.deletionResult.deleted).toBe(true);
  expect(ctx.outputs.deletionResult.previous.id).toBe(20);

  // Verify fetch was called with correct parameters
  expect(global.fetch).toHaveBeenCalledWith(
    'https://example.com/wp-json/wc/v3/products/reviews/20?force=true',
    expect.objectContaining({
      method: 'DELETE',
      headers: expect.any(Object),
    }),
  );
});
