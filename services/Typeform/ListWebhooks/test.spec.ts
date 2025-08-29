import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists webhooks for a form', async () => {
  process.env.token = process.env.TYPEFORM_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    formId: 'test_form_id',
    outputVariable: 'webhooks',
  });

  expect(ctx.outputs['webhooks']).toBeDefined();
});
