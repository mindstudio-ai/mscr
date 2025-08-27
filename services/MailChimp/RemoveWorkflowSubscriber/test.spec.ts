import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('removes subscriber from workflow', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    workflowId: '12345abcde',
    emailAddress: 'test@example.com',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
});
