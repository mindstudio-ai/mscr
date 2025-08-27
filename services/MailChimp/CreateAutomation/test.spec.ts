import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a MailChimp automation', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    title: 'Test Automation',
    fromName: 'Test User',
    replyTo: 'test@example.com',
    listId: '123456',
    workflowType: 'welcomeSeries',
    outputVariable: 'automationResult',
  });

  expect(ctx.outputs['automationResult']).toBeTruthy();
});
