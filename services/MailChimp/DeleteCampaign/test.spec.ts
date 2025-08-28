import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a campaign', async () => {
  // Set environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  const { handler } = await import('./handler.ts');

  // Mock the campaign ID
  const ctx = await runConnector(handler, {
    campaignId: 'test-campaign-id',
    confirmationMessage: 'Campaign deleted successfully',
  });

  // Verify the log was called (this is a simple test since we can't easily verify the actual API call)
  expect(ctx.logs).toContain('Deleting campaign with ID: test-campaign-id');
});
