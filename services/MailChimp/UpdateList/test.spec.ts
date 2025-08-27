import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates mailchimp list and saves output to variable', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID,
    name: 'Updated Test List',
    permissionReminder:
      'You are receiving this email because you signed up on our website.',
    emailTypeOption: 'false',
    companyName: 'Test Company',
    address1: '123 Test St',
    city: 'Test City',
    state: 'TS',
    zip: '12345',
    country: 'US',
    fromName: 'Test Sender',
    fromEmail: 'test@example.com',
    subject: 'Test Subject',
    language: 'en',
    outputVariable: 'updatedList',
  });

  expect(ctx.outputs.updatedList).toBeTruthy();
  expect(ctx.outputs.updatedList.id).toBeTruthy();
});
