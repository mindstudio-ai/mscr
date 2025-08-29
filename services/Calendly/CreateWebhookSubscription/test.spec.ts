import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates webhook subscription and saves output', async () => {
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    callbackUrl: 'https://example.com/webhook',
    events: 'invitee.created,invitee.canceled',
    scope: 'user',
    signingKey: 'test-signing-key-1234',
    outputVariable: 'webhookData',
  });

  expect(ctx.outputs['webhookData']).toBeTruthy();
});
