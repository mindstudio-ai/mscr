import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists alternate emails for a user', async () => {
  process.env.accessToken = process.env.accessToken;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    userId: 'test-user-id',
    outputVariable: 'alternateEmails',
  });

  expect(ctx.outputs['alternateEmails']).toBeTruthy();
  expect(ctx.outputs['alternateEmails'].alternateEmails).toBeDefined();
});
