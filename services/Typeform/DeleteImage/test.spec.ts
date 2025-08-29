import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes image and saves success message', async () => {
  // Set up environment variables
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API call
  global.fetch = vi.fn().mockResolvedValue({
    status: 204,
    ok: true,
  });

  const ctx = await runConnector(handler, {
    imageId: 'test-image-id',
    outputVariable: 'successMessage',
  });

  // Verify the output was set
  expect(ctx.outputs['successMessage']).toBe('Image deleted successfully');

  // Verify the correct API endpoint was called
  expect(fetch).toHaveBeenCalledWith(
    'https://api.typeform.com/images/test-image-id',
    expect.objectContaining({
      method: 'DELETE',
      headers: expect.objectContaining({
        Authorization: 'Bearer test-token',
      }),
    }),
  );
});
