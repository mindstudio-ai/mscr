import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('bulk import contacts', async () => {
  // Set environment variables
  process.env.accessToken = 'test-token';
  process.env.accountIdentifier = 'https://test.api-us1.com';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      success: 1,
      queued_contacts: 1,
      batchId: 'test-batch-id',
      message: 'Contact import queued',
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contacts: [
      {
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
      },
    ],
    excludeAutomations: 'false',
    outputVariable: 'importResult',
  });

  expect(ctx.outputs.importResult).toBeTruthy();
  expect(ctx.outputs.importResult.batchId).toBe('test-batch-id');
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
