import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves webhook details and saves to output variable', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    formId: 'test-form-id',
    tag: 'test-webhook-tag',
    outputVariable: 'webhookDetails',
  });

  expect(ctx.outputs['webhookDetails']).toBeTruthy();
});
