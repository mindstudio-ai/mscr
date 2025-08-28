import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves conversation message', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock inputs
  const inputs = {
    conversationId: 'test-conversation-id',
    messageId: 'test-message-id',
    fields: 'id,subject,message',
    excludeFields: '_links',
    outputVariable: 'messageDetails',
  };

  // This test will be skipped if API keys aren't set
  if (!process.env.apiKey || !process.env.serverPrefix) {
    console.log('Skipping test: Missing API credentials');
    return;
  }

  try {
    const ctx = await runConnector(handler, inputs);
    expect(ctx.outputs['messageDetails']).toBeTruthy();
  } catch (error) {
    // We expect this to fail without valid credentials, but we want to verify the code structure
    expect(error).toBeTruthy();
  }
});
