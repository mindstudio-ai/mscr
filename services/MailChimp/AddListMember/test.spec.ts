import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds member to list', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    emailAddress: 'test@example.com',
    status: 'subscribed',
    emailType: 'html',
    mergeFields: { FNAME: 'Test', LNAME: 'User' },
    tags: 'test,connector',
    outputVariable: 'memberData',
  });

  expect(ctx.outputs['memberData']).toBeTruthy();
});
