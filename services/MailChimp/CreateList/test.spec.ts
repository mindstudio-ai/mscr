import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a list and saves output to variable', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    name: 'Test List',
    permissionReminder: 'You signed up for updates from our website',
    emailTypeOption: 'false',
    company: 'Test Company',
    address1: '123 Test St',
    city: 'Test City',
    country: 'US',
    fromName: 'Test Sender',
    fromEmail: 'test@example.com',
    subject: 'Test Subject',
    language: 'en',
    outputVariable: 'listInfo',
  });

  expect(ctx.outputs['listInfo']).toBeTruthy();
});
