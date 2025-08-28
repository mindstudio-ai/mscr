import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets automation info and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock inputs
  const ctx = await runConnector(handler, {
    workflowId: 'test-workflow-id',
    fields: 'id,status,settings.title',
    outputVariable: 'automationInfo',
  });

  // Just verify the function runs without errors
  // We're not testing the actual API response
  expect(ctx.outputs['automationInfo']).toBeDefined();
});
