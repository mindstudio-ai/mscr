import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates list member and saves output', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID,
    subscriberEmail: process.env.MAILCHIMP_TEST_EMAIL,
    status: 'subscribed',
    mergeFields: { FNAME: 'Test', LNAME: 'User' },
    outputVariable: 'updatedMember',
  });

  expect(ctx.outputs['updatedMember']).toBeTruthy();
  expect(ctx.outputs['updatedMember'].email_address).toBe(
    process.env.MAILCHIMP_TEST_EMAIL,
  );
});
