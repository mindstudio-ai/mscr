import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('removes contact from automation', async () => {
  // Set up environment variables
  process.env.accessToken = 'test-token';
  process.env.accountIdentifier = 'https://test.api-us1.com';

  // Mock fetch to avoid actual API call
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({}),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactAutomationId: '123',
    outputVariable: 'success',
  });

  // Verify the output was set correctly
  expect(ctx.outputs.success).toBe(true);

  // Verify fetch was called with correct parameters
  expect(fetch).toHaveBeenCalledWith(
    'https://test.api-us1.com/api/3/contactAutomations/123',
    expect.objectContaining({
      method: 'DELETE',
      headers: expect.objectContaining({
        'Api-Token': 'test-token',
      }),
    }),
  );
});
