import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('removes group member', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    groupId: 'test-group-id',
    userId: 'test-user-id',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result'].success).toBe(true);
});
