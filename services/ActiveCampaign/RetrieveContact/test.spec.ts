import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves contact and saves to output variable', async () => {
  // Set environment variables
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');

  // Mock contact ID - use a real ID for integration testing
  const contactId = '1';

  const ctx = await runConnector(handler, {
    contactId,
    outputVariable: 'contactData',
  });

  // Verify output was set
  expect(ctx.outputs['contactData']).toBeTruthy();
  expect(ctx.outputs['contactData'].contact).toBeDefined();
  expect(ctx.outputs['contactData'].contact.id).toBe(contactId);
});
