import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes webhook successfully', async () => {
  // Set environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  // Mock the success response (204 No Content)
  global.fetch = vi.fn().mockImplementation(() => {
    return Promise.resolve({
      status: 204,
      ok: true,
    });
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    webhookId: 'test-webhook-id',
  });
});
