import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('list automated email subscribers', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    workflowId: 'test-workflow-id',
    workflowEmailId: 'test-workflow-email-id',
    outputVariable: 'subscriberQueue',
  });

  expect(ctx.outputs['subscriberQueue']).toBeDefined();
});
