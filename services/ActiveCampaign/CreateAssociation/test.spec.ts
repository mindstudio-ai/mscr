import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates association between contact and account', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactId: '123',
    accountId: '456',
    jobTitle: 'Product Manager',
    outputVariable: 'associationData',
  });

  expect(ctx.outputs['associationData']).toBeTruthy();
});
