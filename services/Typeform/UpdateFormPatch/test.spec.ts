import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates form and saves output to variable', async () => {
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    status: 204,
    ok: true,
  });

  const ctx = await runConnector(handler, {
    formId: 'abc123',
    title: 'Updated Form Title',
    isPublic: 'false',
    outputVariable: 'result',
  });

  expect(ctx.outputs.result).toBeDefined();
  expect(ctx.outputs.result.success).toBe(true);
  expect(ctx.outputs.result.statusCode).toBe(204);

  // Verify the fetch was called with correct parameters
  expect(fetch).toHaveBeenCalledWith(
    'https://api.typeform.com/forms/abc123',
    expect.objectContaining({
      method: 'PATCH',
      headers: expect.objectContaining({
        Authorization: 'Bearer mock-token',
        'Content-Type': 'application/json',
      }),
    }),
  );
});
