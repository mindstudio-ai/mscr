import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('refreshes webhook and saves expiration time', async () => {
  // Set up environment variables
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    webhookId: 'wnkXXXXXXXXXXXXXX',
    outputVariable: 'webhookData',
  });

  expect(ctx.outputs['webhookData']).toBeTruthy();
  expect(ctx.outputs['webhookData'].expirationTime).toBeDefined();
});
