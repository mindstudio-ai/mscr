import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds member to segment and saves output', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    segmentId: 'test-segment-id',
    emailAddress: 'test@example.com',
    outputVar: 'segmentMemberResult',
  });

  expect(ctx.outputs['segmentMemberResult']).toBeTruthy();
});
