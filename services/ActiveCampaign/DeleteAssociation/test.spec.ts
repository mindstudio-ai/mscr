import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes association successfully', async () => {
  process.env.accessToken = 'test-token';
  process.env.accountIdentifier = 'https://testaccount.api-us1.com';

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    associationId: '123',
  });
});
