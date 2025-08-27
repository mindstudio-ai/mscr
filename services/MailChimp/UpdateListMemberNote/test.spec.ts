import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates list member note and saves output', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    subscriberHash: 'test-subscriber-hash',
    noteId: '123',
    noteContent: 'Updated note content for testing',
    outputVariable: 'updatedNote',
  });

  expect(ctx.outputs['updatedNote']).toBeTruthy();
});
