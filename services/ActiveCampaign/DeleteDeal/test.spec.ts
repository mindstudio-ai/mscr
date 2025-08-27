import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('successfully deletes a deal', async () => {
  // Set up environment variables
  process.env.accessToken = 'test-token';
  process.env.accountIdentifier = 'https://test.api-us1.com';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ success: true }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    dealId: '123',
    successMessageVar: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledWith(
    'https://test.api-us1.com/api/3/deals/123',
    expect.objectContaining({
      method: 'DELETE',
      headers: expect.objectContaining({
        'Api-Token': 'test-token',
      }),
    }),
  );
});
