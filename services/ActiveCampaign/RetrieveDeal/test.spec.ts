import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves deal and saves to output variable', async () => {
  // Set up environment variables
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    dealId: '1', // Use a test deal ID
    outputVariable: 'dealData',
  });

  expect(ctx.outputs['dealData']).toBeTruthy();
});
