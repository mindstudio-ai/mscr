import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves subscriber information', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock inputs
  const ctx = await runConnector(handler, {
    workflowId: '12345abcde',
    subscriberHash: 'md5hash123456',
    outputVariable: 'subscriberInfo',
  });

  // Verify output was set
  expect(ctx.outputs['subscriberInfo']).toBeTruthy();
});
