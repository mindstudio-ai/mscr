import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes workflow email successfully', async () => {
  // Set environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  const { handler } = await import('./handler.ts');

  // Mock values for test
  const ctx = await runConnector(handler, {
    workflowId: 'test-workflow-id',
    workflowEmailId: 'test-workflow-email-id',
  });

  // Since this is a deletion operation with no output,
  // we just verify the function runs without throwing an error
  expect(ctx).toBeDefined();
});
