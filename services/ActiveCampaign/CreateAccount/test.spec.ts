import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates account and saves output', async () => {
  // Set up environment variables
  process.env.accessToken = 'test-token';
  process.env.accountIdentifier = 'https://example.api-us1.com';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    accountName: 'Test Account',
    accountUrl: 'https://www.test.com',
    outputVariable: 'createdAccount',
  });

  expect(global.fetch).toHaveBeenCalled();
  expect(ctx.outputs.createdAccount).toBeTruthy();
  expect(ctx.outputs.createdAccount.account.name).toBe('Test Account');
});
