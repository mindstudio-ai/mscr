import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes responses and saves job IDs to output variable', async () => {
  // Mock environment variables
  process.env.token = 'mock-token';

  // Mock fetch response
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ['job-id-1', 'job-id-2'],
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    emails: 'test1@example.com\ntest2@example.com',
    accountId: 'test-account-id',
    outputVariable: 'jobIds',
  });

  // Verify the output was set correctly
  expect(ctx.outputs.jobIds).toEqual(['job-id-1', 'job-id-2']);

  // Verify fetch was called with correct parameters
  expect(fetch).toHaveBeenCalledWith(
    'https://api.typeform.com/rtbf/test-account-id/responses',
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer mock-token',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['test1@example.com', 'test2@example.com']),
    },
  );
});
