import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a product review and saves output', async () => {
  // Set up environment variables
  process.env.url = 'https://example-store.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      id: 123,
      product_id: 456,
      reviewer: 'Test User',
      reviewer_email: 'test@example.com',
      review: 'Great product!',
      rating: 5,
      status: 'approved',
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    productId: '456',
    review: 'Great product!',
    reviewer: 'Test User',
    reviewerEmail: 'test@example.com',
    rating: '5',
    status: 'approved',
    verified: 'false',
    outputVariable: 'reviewData',
  });

  expect(ctx.outputs.reviewData).toBeTruthy();
  expect(ctx.outputs.reviewData.id).toBe(123);
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
