import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a campaign and saves the ID to output variable', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    type: 'regular',
    campaignName: 'Test Campaign',
    subjectLine: 'Test Subject',
    fromName: 'Test Sender',
    replyTo: 'test@example.com',
    listId: process.env.MAILCHIMP_TEST_LIST_ID,
    autoFooter: 'true',
    inlineCss: 'true',
    outputVariable: 'campaignId',
  });

  expect(ctx.outputs.campaignId).toBeTruthy();
});
