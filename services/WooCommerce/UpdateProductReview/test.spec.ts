import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates product review and saves output', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';
  
  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 20,
      product_id: 31,
      status: 'approved',
      review: 'Now works just fine.',
      rating: 5,
      verified: true
    })
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    reviewId: '20',
    rating: 5,
    review: 'Now works just fine.',
    outputVariable: 'updatedReview'
  });

  expect(ctx.outputs['updatedReview']).toBeTruthy();
  expect(ctx.outputs['updatedReview'].id).toBe(20);
  expect(ctx.outputs['updatedReview'].rating).toBe(5);
  
  // Verify fetch was called with correct parameters
  expect(fetch).toHaveBeenCalledTimes(1);
  const [url, options] = (fetch as any).mock.calls[0];
  expect(url).toContain('/wp-json/wc/v3/products/reviews/20');
  expect(options.method).toBe('PUT');
});