import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves account contacts for a contact', async () => {
  // Set environment variables for test
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactId: '1', // Use a test contact ID
    outputVariable: 'accountContacts',
  });

  // Verify that the output variable was set
  expect(ctx.outputs['accountContacts']).toBeDefined();
});
