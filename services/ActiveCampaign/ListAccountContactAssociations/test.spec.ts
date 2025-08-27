import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists account-contact associations', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_BASE_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'accountContactsResult',
  });

  expect(ctx.outputs['accountContactsResult']).toBeTruthy();
});

test('filters by contact ID', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_BASE_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactId: '123',
    outputVariable: 'filteredResults',
  });

  expect(ctx.outputs['filteredResults']).toBeTruthy();
});
