import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes merge field successfully', async () => {
  // Set environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  const { handler } = await import('./handler.ts');

  // Mock successful deletion - no output expected
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    mergeId: 'test-merge-id',
  });
});
