import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves contact activities', async () => {
  // Set environment variables
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactId: '1', // Use a test contact ID
    outputVariable: 'contactActivities',
  });

  expect(ctx.outputs['contactActivities']).toBeTruthy();
});

test('handles filtering options', async () => {
  // Set environment variables
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactId: '1', // Use a test contact ID
    afterDate: '2023-01-01T00:00:00',
    sortOrder: 'asc',
    includeEmails: 'true',
    outputVariable: 'filteredActivities',
  });

  expect(ctx.outputs['filteredActivities']).toBeTruthy();
});
