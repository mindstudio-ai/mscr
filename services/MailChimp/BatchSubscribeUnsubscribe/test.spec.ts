import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('batch subscribe members to list', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    members: [
      {
        email_address: 'test@example.com',
        status: 'subscribed',
        merge_fields: {
          FNAME: 'Test',
          LNAME: 'User',
        },
      },
    ],
    updateExisting: 'true',
    skipMergeValidation: 'false',
    skipDuplicateCheck: 'false',
    outputVariable: 'batchResult',
  });

  expect(ctx.outputs['batchResult']).toBeDefined();
});
