import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists webhook payloads', async () => {
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    webhookId: 'wnkXXXXXXXXXXXXXX',
    outputVariable: 'webhookPayloads',
  });

  expect(ctx.outputs['webhookPayloads']).toBeTruthy();
});

test('includes optional parameters when provided', async () => {
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    webhookId: 'wnkXXXXXXXXXXXXXX',
    cursor: '5',
    limit: '20',
    outputVariable: 'webhookPayloads',
  });

  expect(ctx.outputs['webhookPayloads']).toBeTruthy();
});
