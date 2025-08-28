import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves member tags and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Skip test if API key is not available
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX) {
    console.log('Skipping test: Missing MailChimp API credentials');
    return;
  }

  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || '123456', // Use env var or placeholder
    subscriberId: process.env.MAILCHIMP_TEST_SUBSCRIBER || 'test@example.com',
    count: '10',
    offset: '0',
    outputVariable: 'memberTags',
  });

  expect(ctx.outputs['memberTags']).toBeDefined();
  expect(ctx.outputs['memberTags']).toHaveProperty('tags');
  expect(ctx.outputs['memberTags']).toHaveProperty('total_items');
});
