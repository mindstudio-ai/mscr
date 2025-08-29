import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('moves an item to a folder', async () => {
  // Set up mock environment
  process.env.token = 'mock-token';

  // Import the handler
  const { handler } = await import('./handler.ts');

  // Run the connector with test inputs
  const ctx = await runConnector(handler, {
    itemId: 'test-item-id',
    toFolderId: 'test-folder-id',
    outputVariable: 'result',
  });

  // Verify the output was set
  expect(ctx.outputs['result']).toBeTruthy();
});
