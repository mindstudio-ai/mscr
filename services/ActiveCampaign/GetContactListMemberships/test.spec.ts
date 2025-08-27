import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves contact list memberships', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_BASE_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactId: '1',
    outputVariable: 'contactListMemberships',
  });

  expect(ctx.outputs['contactListMemberships']).toBeTruthy();
});
