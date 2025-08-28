import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists campaigns and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignType: '',
    campaignStatus: '',
    listId: '',
    count: '10',
    offset: '0',
    outputVariable: 'campaigns',
  });

  expect(ctx.outputs['campaigns']).toBeTruthy();
  expect(ctx.outputs['campaigns'].campaigns).toBeDefined();
});
