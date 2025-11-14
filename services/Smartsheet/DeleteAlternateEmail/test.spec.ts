import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes alternate email', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    userId: 'test-user-id',
    alternateEmailId: 'test-email-id',
    outputVariable: 'deleteResult',
  });

  expect(ctx.outputs['deleteResult']).toBeTruthy();
  expect(ctx.outputs['deleteResult'].success).toBe(true);
});
