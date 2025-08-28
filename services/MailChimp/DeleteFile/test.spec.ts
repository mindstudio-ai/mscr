import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes file and saves confirmation message', async () => {
  // Set up environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    fileId: 'test-file-id',
    outputVariable: 'deleteConfirmation',
  });

  // Verify the output was set correctly
  expect(ctx.outputs.deleteConfirmation).toBe('File successfully deleted');
});
