import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists conversations and saves to output variable', async () => {
  // Set required environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    hasUnreadMessages: '',
    count: '10',
    offset: '0',
    outputVariable: 'conversations',
  });

  expect(ctx.outputs['conversations']).toBeTruthy();
});
