import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a webhook and saves output to variable', async () => {
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    formId: 'abc123',
    tag: 'test-webhook',
    url: 'https://example.com/webhook',
    enabled: 'true',
    formResponse: 'true',
    formResponsePartial: 'false',
    verifySSL: 'true',
    outputVariable: 'webhookResult',
  });

  expect(ctx.outputs['webhookResult']).toBeTruthy();
});
