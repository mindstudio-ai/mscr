import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets automated email subscriber information', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    workflowId: '12345abcde',
    workflowEmailId: '67890fghij',
    subscriberHash: 'md5hash123456',
    outputVariable: 'subscriberInfo',
  });

  expect(ctx.outputs['subscriberInfo']).toBeTruthy();
});
