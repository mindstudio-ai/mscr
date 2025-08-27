import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates contact and saves output', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactId: '123',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    outputVariable: 'updatedContact',
  });

  expect(ctx.outputs['updatedContact']).toBeTruthy();
});
