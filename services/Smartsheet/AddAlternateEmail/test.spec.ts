import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds alternate email for a user', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    userId: 'test-user-id',
    email: 'test@example.com',
    outputVariable: 'newEmail',
  });

  expect(ctx.outputs['newEmail']).toBeTruthy();
  expect(ctx.outputs['newEmail'].id).toBeDefined();
});
