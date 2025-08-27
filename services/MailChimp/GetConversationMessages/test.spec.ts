import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves conversation messages', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock a conversation ID - this should be replaced with a real one for actual testing
  const conversationId = 'test-conversation-id';

  const ctx = await runConnector(handler, {
    conversationId,
    isRead: '',
    sinceTimestamp: '',
    beforeTimestamp: '',
    outputVariable: 'conversationMessages',
  });

  expect(ctx.outputs['conversationMessages']).toBeDefined();
});
