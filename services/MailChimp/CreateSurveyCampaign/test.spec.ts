import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a survey campaign and saves the campaign ID to output variable', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    surveyId: 'test-survey-id',
    subjectLine: 'Test Survey Campaign',
    fromName: 'Test Sender',
    replyTo: 'test@example.com',
    outputVariable: 'campaignId',
  });

  expect(ctx.outputs['campaignId']).toBeTruthy();
});
