import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves contact automations', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactId: '12345',
    outputVariable: 'contactAutomations',
  });

  expect(ctx.outputs['contactAutomations']).toBeTruthy();
});
