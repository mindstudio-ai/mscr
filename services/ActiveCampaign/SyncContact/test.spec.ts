import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('syncs contact and saves output', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    phone: '1234567890',
    customFields: [{ field: '1', value: 'Test Value' }],
    outputVariable: 'contactResult',
  });

  expect(ctx.outputs['contactResult']).toBeTruthy();
});
