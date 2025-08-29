import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves sample webhook data', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    webhookEvent: 'invitee.created',
    outputVariable: 'webhookData',
  });

  expect(ctx.outputs['webhookData']).toBeTruthy();
});
