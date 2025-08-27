import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves account details', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    accountId: '1',
    outputVariable: 'accountDetails',
  });

  expect(ctx.outputs['accountDetails']).toBeTruthy();
});
