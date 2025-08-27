import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a contact and saves output to variable', async () => {
  // Set environment variables
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    phone: '1234567890',
    allowNullEmail: 'false',
    customFields: [{ field: '1', value: 'Test Value' }],
    outputVariable: 'contactResult',
  });

  expect(ctx.outputs['contactResult']).toBeTruthy();
});
