import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds or updates a list member', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID,
    emailAddress: 'test@example.com',
    status: 'subscribed',
    mergeFields: { FNAME: 'Test', LNAME: 'User' },
    tags: 'test-tag',
    language: 'en',
    vip: 'false',
    outputVariable: 'memberData',
  });

  expect(ctx.outputs['memberData']).toBeTruthy();
});
