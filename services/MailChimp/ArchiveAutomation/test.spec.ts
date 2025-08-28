import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('archives automation workflow', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock the workflow ID
  const ctx = await runConnector(handler, {
    workflowId: '12345abcde',
  });
});
