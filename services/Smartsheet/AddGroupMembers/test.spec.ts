import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds group members', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    groupId: 'test-group-id',
    memberEmails: 'test1@example.com,test2@example.com',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});
