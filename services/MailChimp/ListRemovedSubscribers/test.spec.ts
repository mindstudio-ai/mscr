import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves removed subscribers from workflow', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock workflow ID - use a real one for actual testing
  const ctx = await runConnector(handler, {
    workflowId: 'test-workflow-id',
    outputVariable: 'removedSubscribers',
  });

  // Verify output is set
  expect(ctx.outputs['removedSubscribers']).toBeDefined();
});
