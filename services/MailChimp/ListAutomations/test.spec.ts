import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists automations and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    count: '10',
    offset: '0',
    status: '',
    outputVariable: 'automationsList',
  });

  expect(ctx.outputs['automationsList']).toBeTruthy();
});
