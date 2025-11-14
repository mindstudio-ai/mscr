import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets group', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    groupId: 'test-group-id',
    outputVariable: 'group',
  });
  expect(ctx.outputs['group']).toBeTruthy();
});
