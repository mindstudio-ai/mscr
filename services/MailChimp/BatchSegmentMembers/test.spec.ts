import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves output to outVar', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    segmentId: 'test-segment-id',
    membersToAdd: 'test1@example.com, test2@example.com',
    membersToRemove: 'test3@example.com',
    outputVariable: 'outVar',
  });

  expect(ctx.outputs['outVar']).toBeTruthy();
});
