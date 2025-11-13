import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves post submission ID to output variable', async () => {
  process.env.apiKey = process.env.BLOTATO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    postText: 'Test post from connector',
    platform: 'twitter',
    accountId: 'acc_12345',
    scheduleType: 'immediate',
    outputVariable: 'postSubmissionId',
  });

  expect(ctx.outputs['postSubmissionId']).toBeTruthy();
});
