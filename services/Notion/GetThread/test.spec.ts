import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves thread information', async () => {
  // Mock environment variables
  process.env.token = 'mock-token';

  // Import the handler
  const { handler } = await import('./handler.ts');

  // Run the connector with test inputs
  const ctx = await runConnector(handler, {
    designId: 'DAFVztcvd9z',
    threadId: 'KeAbiEAjZEj',
    outputVariable: 'threadInfo',
  });

  // Verify that the output variable was set
  expect(ctx.outputs.threadInfo).toBeDefined();
});
