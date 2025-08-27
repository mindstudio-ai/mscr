import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('pauses automation emails successfully', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock successful response
  const ctx = await runConnector(handler, {
    workflowId: '12345abcde',
  });

  // Since this endpoint returns no content on success, we just verify no error was thrown
  expect(ctx.error).toBeUndefined();
});
