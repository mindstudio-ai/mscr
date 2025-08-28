import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves conversation and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock inputs
  const ctx = await runConnector(handler, {
    conversationId: 'test-conversation-id',
    fields: 'id,subject,last_message',
    excludeFields: '_links',
    outputVariable: 'conversationData',
  });

  // Verify output was set
  expect(ctx.outputs['conversationData']).toBeTruthy();
});
