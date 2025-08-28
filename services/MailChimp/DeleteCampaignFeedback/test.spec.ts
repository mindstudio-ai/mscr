import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes campaign feedback successfully', async () => {
  // Set environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  const { handler } = await import('./handler.ts');

  // Mock successful deletion (204 response)
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      status: 204,
      ok: true,
    }),
  );

  const ctx = await runConnector(handler, {
    campaignId: 'test-campaign-id',
    feedbackId: 'test-feedback-id',
  });
});
