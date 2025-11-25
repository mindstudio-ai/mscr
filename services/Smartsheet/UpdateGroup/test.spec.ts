import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates group', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    groupId: 'test-group-id',
    name: 'Updated Group Name',
    outputVariable: 'group',
  });
  expect(ctx.outputs['group']).toBeTruthy();
});
