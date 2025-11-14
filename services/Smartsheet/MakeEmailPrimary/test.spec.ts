import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('makes alternate email primary', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    userId: 'test-user-id',
    alternateEmailId: 'test-email-id',
    outputVariable: 'primaryEmail',
  });

  expect(ctx.outputs['primaryEmail']).toBeTruthy();
  expect(ctx.outputs['primaryEmail'].email).toBeDefined();
});
