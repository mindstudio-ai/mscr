import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('fetches activity log entries from Calendly', async () => {
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    count: '10',
    sort: 'created_at:desc',
    outputVariable: 'activityLogs',
  });

  expect(ctx.outputs['activityLogs']).toBeTruthy();
  expect(ctx.outputs['activityLogs'].collection).toBeDefined();
  expect(ctx.outputs['activityLogs'].pagination).toBeDefined();
});
