import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('successfully pings MailChimp API', async () => {
  // Set required environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY || 'test-api-key';
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX || 'us1';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'healthStatus',
  });

  // Verify the output was set
  expect(ctx.outputs['healthStatus']).toBeTruthy();
});
