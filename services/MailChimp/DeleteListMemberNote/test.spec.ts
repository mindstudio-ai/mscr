import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a list member note', async () => {
  // Set environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  const { handler } = await import('./handler.ts');

  // Mock inputs
  const inputs = {
    listId: 'test-list-id',
    subscriberHash: 'test-subscriber@example.com',
    noteId: 'test-note-id',
  };

  // Run connector
  const ctx = await runConnector(handler, inputs);
});
