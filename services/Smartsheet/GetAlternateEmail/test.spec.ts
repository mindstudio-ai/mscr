import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets alternate email details', async () => {
  process.env.accessToken = process.env.accessToken;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    userId: 'test-user-id',
    alternateEmailId: 'test-email-id',
    outputVariable: 'emailDetails',
  });

  expect(ctx.outputs['emailDetails']).toBeTruthy();
});
