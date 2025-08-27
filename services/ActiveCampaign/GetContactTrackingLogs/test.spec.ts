import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves contact tracking logs', async () => {
  // Set environment variables
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactId: '123', // Use a test contact ID
    outputVariable: 'trackingLogsData',
  });

  // Just check that the output was set
  expect(ctx.outputs['trackingLogsData']).toBeDefined();
});
