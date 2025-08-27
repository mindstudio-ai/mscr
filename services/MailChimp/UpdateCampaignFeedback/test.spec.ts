import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates campaign feedback and saves output', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: 'test-campaign-id',
    feedbackId: 'test-feedback-id',
    message: 'Updated feedback message',
    blockId: '123',
    isComplete: 'true',
    outputVariable: 'updatedFeedback',
  });

  expect(ctx.outputs['updatedFeedback']).toBeTruthy();
});
