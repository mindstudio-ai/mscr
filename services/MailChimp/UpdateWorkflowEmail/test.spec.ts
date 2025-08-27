import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates workflow email and saves output', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    workflowId: 'test-workflow-id',
    workflowEmailId: 'test-email-id',
    subjectLine: 'Updated Subject Line',
    outputVariable: 'updatedEmail',
  });

  expect(ctx.outputs['updatedEmail']).toBeTruthy();
});
