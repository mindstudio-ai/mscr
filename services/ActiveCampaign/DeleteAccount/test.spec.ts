import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes account and saves output to result variable', async () => {
  // Set environment variables
  process.env.accessToken = 'test-token';
  process.env.accountIdentifier = 'https://testaccount.api-us1.com';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    accountId: '123',
    confirmation: 'yes',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toEqual({ success: true });
});

test('does not delete account when confirmation is no', async () => {
  const { handler } = await import('./handler.ts');

  await expect(
    runConnector(handler, {
      accountId: '123',
      confirmation: 'no',
      outputVariable: 'result',
    }),
  ).rejects.toThrow('Account deletion was not confirmed');
});
